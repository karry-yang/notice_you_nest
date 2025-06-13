import { HabitTask } from '@task/entities/habit-task.entity';
import { IHabitTaskRepository } from './interfaces/habit-task.repository.interface';
import { PaginatedResult, TaskCursor } from 'src/common/types/paginatedResult.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { generateSnowflakeId } from '@shared/lib/snowflake';
import { CreateHabitTaskDto } from '@task/dto/habitTask/createHabitTask.dto';
import { UpdateHabitTaskDto } from '@task/dto/habitTask/updateHabitTask.dto';
import { error } from 'console';
import { RateDto } from 'src/modules/checkIn/dto/common/rate.dto';
import { strict } from 'assert';
import { da } from '@faker-js/faker/.';

export class HabitTaskRepository implements IHabitTaskRepository {
  constructor(
    @InjectRepository(HabitTask)
    private readonly habitTask: Repository<HabitTask>,
    private readonly dataSource: DataSource
  ) {}

  async findHabitDetailByTaskId(habitTaskId: string): Promise<HabitTask | null> {
    const sql = `
    SELECT * 
    FROM habit_task
    WHERE habit_task_id = ?
  `;

    const result = await this.dataSource.query(sql, [habitTaskId]);

    return result[0] ?? null; // 因为 query 返回的是数组
  }

  async findByUserId(userId: string, nextCursor: TaskCursor | null): Promise<PaginatedResult<HabitTask>> {
    const pageSize = 10; // 每页10条，可传参

    let params: any[] = [userId];
    let cursorCondition = '';

    if (nextCursor?.createdAt && nextCursor?.taskId) {
      cursorCondition = `
      AND (
        created_at < ? OR 
        (created_at = ? AND habit_task_id < ?)
      )
    `;
      params.push(nextCursor.createdAt, nextCursor.createdAt, nextCursor.taskId);
    }

    //PS 个人用户查询所有的habit的时候是否考虑使用habit_group_id分组  ？
    const sql = `
    SELECT ht.* hg.habit_group_id,hg.habit_group_title
    FROM habit_task ht
    LEFT JOIN  habit_group hg  ON 
    WHERE user_id = ?
    ${cursorCondition}
    ORDER BY  created_at DESC, habit_task_id DESC
    LIMIT ?
  `;

    params.push(pageSize);

    const result = await this.dataSource.query(sql, params);

    const hasNextPage = result.length === pageSize;
    const last = result[result.length - 1];

    let encodedCursor: string | null = null;
    if (hasNextPage && last) {
      encodedCursor = Buffer.from(
        JSON.stringify({
          createdAt: last.created_at.toISOString(),
          taskId: last.id,
        })
      ).toString('base64');
    }

    return {
      data: result,
      nextCursor: encodedCursor,
      hasNextPage,
    };
  }

  async findHabitsByGroupId(groupId: string, nextCursor: TaskCursor | null): Promise<PaginatedResult<HabitTask>> {
    const pageSize = 10; // 每页10条，可传参

    let params: any[] = [groupId];
    let cursorCondition = '';

    if (nextCursor?.createdAt && nextCursor?.taskId) {
      cursorCondition = `
      AND (
        created_at < ? OR 
        (created_at = ? AND habit_task_id < ?)
      )
    `;
      params.push(nextCursor.createdAt, nextCursor.createdAt, nextCursor.taskId);
    }
    params.push(pageSize);

    const sql = `
    SELECT *.ht
    FROM habit_task
    LEFT JOIN habit_task_group htg ON htg.habit_task_group_id= ht.habit_task_group_id
    WHERE ht.task_id=?
     ${cursorCondition}
    ORDER BY  created_at DESC, habit_task_id DESC
    LIMIT ?
    `;
    const result = await this.dataSource.query(sql, params);
    const hasNextPage = result.length === pageSize;
    const last = result[result.length - 1];

    let encodedCursor: string | null = null;
    if (hasNextPage && last) {
      encodedCursor = Buffer.from(
        JSON.stringify({
          createdAt: last.created_at.toISOString(),
          taskId: last.id,
        })
      ).toString('base64');
    }

    return {
      data: result,
      nextCursor: encodedCursor,
      hasNextPage,
    };
  }
  async createHabitTask(createHabitTask: CreateHabitTaskDto,taskId:string): Promise<HabitTask | null> {
    const habitTask = this.dataSource.getRepository(HabitTask).create({
      ...createHabitTask,
      habitTaskId:taskId
    });

    return await this.dataSource.getRepository(HabitTask).save(habitTask,);
  }

  async updateHabitTask(updateHabitTask: UpdateHabitTaskDto): Promise<HabitTask | null> {
    const habitTaskRepo = this.dataSource.getRepository(HabitTask);

    // 查找要更新的 habitTask
    const habitTask = await habitTaskRepo.findOne({
      where: { habitTaskId: updateHabitTask.habitTaskId },
    });

    // 如果找不到，返回 null 或抛出异常
    if (!habitTask) {
      throw new Error('Habit task not found');
    }

    // 更新字段（确保只更新传入的字段）
    if (updateHabitTask.habitTaskTitle) habitTask.habitTaskTitle = updateHabitTask.habitTaskTitle;
    if (updateHabitTask.habitTaskStartTime) habitTask.habitTaskStartTime = updateHabitTask.habitTaskStartTime;
    if (updateHabitTask.habitTaskEndTime) habitTask.habitTaskEndTime = updateHabitTask.habitTaskEndTime;
    if (updateHabitTask.habitTaskDescription) habitTask.habitTaskDescription = updateHabitTask.habitTaskDescription;
    if (updateHabitTask.habitTaskNoticeTime) habitTask.habitTaskNoticeTime = updateHabitTask.habitTaskNoticeTime;
    if (updateHabitTask.habitTaskOpenLog !== undefined) habitTask.habitTaskOpenLog = updateHabitTask.habitTaskOpenLog;
    if (updateHabitTask.habitTaskGroupId) habitTask.habitTaskGroupId = updateHabitTask.habitTaskGroupId;

    // 保存更新后的 habitTask
    return await habitTaskRepo.save(habitTask);
  }

  //获取最近七天数据{ date!: Date;total!: number;completed!: number;}[]
  async findHabitsSevenDaiesData(userId: string, endTime: Date): Promise<RateDto[]> {
    const startDate = new Date(endTime);
    startDate.setDate(startDate.getDate() - 6);
    const sql = `
    WITH   RECURSIVE calendar  AS(
    SELECT  ?  AS date
    UNION ALL
    SELECT date + INTERVAL 1 DAY
    FROM calendar
    WHERE date<?
    )
    SELECT  c.date  as date,
     COUNT(DISTINCT ht.id) AS total,
  COUNT(DISTINCT CASE WHEN hf.is_effective = 1 THEN hf.task_id END) AS completed
FROM calendar c
LEFT JOIN habit_task ht 
  ON ht.end_date >= c.date  -- 还没过期的任务
  AND ht.task_start_time<=c.date
LEFT JOIN habit_focus hf 
  ON hf.task_id = ht.id 
  AND DATE( hf.focus_date )= c.date
   AND hf.user_id = ?
GROUP BY c.date
ORDER BY c.date
    `;
    const data = await this.dataSource.query(sql, [
      startDate.toISOString().split('T')[0], // YYYY-MM-DD
      endTime.toISOString().split('T')[0], // YYYY-MM-DD
      userId,
    ]);

    return data.map((row: { date: string; total: string; completed: string }) => ({
      date: new Date(row.date), // 把字符串转为 Date 类型
      total: Number(row.total), // 把字符串转为数字
      completed: Number(row.completed), // 把字符串转为数字
    }));
  }

  async  findIsLastHabits(userId: string,nextCursor:TaskCursor | null,timestamp:Date,limit?:number): Promise<PaginatedResult<HabitTask>> {
//
let pageSize=10
if(limit){
   pageSize=limit
}
       let params: any[] = [userId,timestamp];
      let cursorCondition=''
          if (nextCursor?.createdAt && nextCursor?.taskId) {
      cursorCondition = `
      AND (
        created_at < ? OR 
        (created_at = ? AND habit_task_id < ?)
      )
    `;
      params.push(nextCursor.createdAt, nextCursor.createdAt, nextCursor.taskId,pageSize);
    }
      const sql= `
      SELECT *  FROM habit_task
       WHERE user_id=?
     AND ? BETWEEN task_start_time AND task_end_time
        ${cursorCondition}
          ORDER BY  created_at DESC, habit_task_id DESC
    LIMIT ?
      `
  const result= await  this.dataSource.query(sql,params)
      
  
    const hasNextPage = result.length === pageSize;
    const last = result[result.length - 1];

    let encodedCursor: string | null = null;
    if (hasNextPage && last) {
      encodedCursor = Buffer.from(
        JSON.stringify({
          createdAt: last.created_at.toISOString(),
          taskId: last.id,
        })
      ).toString('base64');
    }
   return {
      data: result,
      nextCursor: encodedCursor,
      hasNextPage,
    };
  }
}
