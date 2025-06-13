import { encodeCursor, FocusCursor, PaginatedResult } from 'src/common/types/paginatedResult.interface';
import { CreateFocusDto } from '../dto/focus/create-focus.dto';
import { HabitFocus } from '../entities/habit-focus.entity';
import { IFocusRespository } from './interfaces/focus.repository.interface';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultSetHeader } from 'mysql2';
import { RateDto } from '../dto/common/rate.dto';

@Injectable()
export class FocusRepository implements IFocusRespository {
  constructor(
    @InjectRepository(HabitFocus)
    private readonly habitFocusRepo: Repository<HabitFocus>,
    private readonly dataSource: DataSource // 注入 DataSource
  ) {}

  async findByHabitTaskId(habitTaskId: string, nextCursor: FocusCursor | null, pageSize = 10): Promise<PaginatedResult<HabitFocus>> {
    const values: any[] = [habitTaskId];
    let whereClause = `hf.habit_task_id = ?`;

    // 如果存在游标，添加分页条件
    if (nextCursor?.createdAt && nextCursor?.focusId) {
      whereClause += ` AND (
      hf.created_at < ?
      OR (hf.created_at = ? AND hf.focus_id < ?)
    )`;
      values.push(nextCursor.createdAt, nextCursor.createdAt, nextCursor.focusId);
    }

    // 添加分页数量
    values.push(pageSize + 1); // 多查 1 条用于判断是否有下一页

    const sql = `
    SELECT 
      hf.*,
      h.habit_name
    FROM habit_focus hf
    LEFT JOIN habit h ON h.habit_task_id = hf.habit_task_id
    WHERE ${whereClause}
    ORDER BY hf.created_at DESC, hf.focus_id DESC
    LIMIT ?
  `;

    const results = await this.dataSource.query(sql, values);

    const hasNextPage = results.length > pageSize;
    const data = results.slice(0, pageSize);

    const newCursor = hasNextPage
      ? encodeCursor(
          {
            createdAt: data[data.length - 1].created_at,
            focusId: data[data.length - 1].focus_id,
          },
          'FocusCursor'
        )
      : null;

    return {
      data,
      nextCursor: newCursor,
      hasNextPage,
    };
  }

  async createFocus(createFocus: CreateFocusDto,userId:string): Promise<HabitFocus | null> {
    const data = this.habitFocusRepo.create({...createFocus,createdBy:userId});
    return await this.habitFocusRepo.save(data);
  }
  //查看个人打卡数据

  async deleteFocus(focusId: string): Promise<boolean> {
    const conn = await this.dataSource.driver.obtainMasterConnection(); // 获取底层 mysql2 连接
    const [result]: [ResultSetHeader, any] = await conn.execute('DELETE FROM habit_focus WHERE habit_focus_id = ?', [focusId]);
    return result.affectedRows > 0;
  }
  async countFocusByHabitId(habitId: string): Promise<{ totalCount: number; isEffectiveCount: number }> {
    throw new Error('Method not implemented.');
  }

  async isFocused(habitId: string): Promise<HabitFocus> {
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<HabitFocus | null> {
    const sql = `
  SELECT * FRROM habit_focus 
WHERE  habit_focus_id=?
  `;
    const data = await this.dataSource.query(sql, [id]);
    return data[0] ?? null;
  }
  findFocused(time: Date, nextCousor: FocusCursor, userId: string): Promise<PaginatedResult<HabitFocus>> {
    throw new Error('Method not implemented.');
  }

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
}
