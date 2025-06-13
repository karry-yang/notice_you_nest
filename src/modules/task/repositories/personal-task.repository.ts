import { InjectRepository } from '@nestjs/typeorm';
import { IPersonalTaskRepository } from './interfaces/personal-task.repository.interface';
import { PersonalTask } from '@task/entities/personal-task.entity';
import { encodeCursor, PaginatedResult, TaskCursor, TaskUpdatedCursor } from 'src/common/types/paginatedResult.interface';
import { DataSource, Repository } from 'typeorm';
import { PersonalTaskTag } from '@task/entities/personal-task-tag.entity';
import { TaskCursorDto, TaskLevelCursorDto, TaskUpdatedCursorDto } from 'src/common/dto/paginatedResult.dto';
import { BasePersonalTasksGroupDto } from '@task/dto/personalTask/base-personal-tasks-group.dto';
import { BasePersonalTaskSummaryDto } from '@task/dto/personalTask/personal-task-summary.dto';
import { PersonalTaskFilterDto } from '@task/dto/personalTask/psersonal-task-filter.dto';
import { buildFilterConditionWithParams } from 'src/common/utils/buildFilterCondition.util';
import { attributesPersonalTask } from './sql';
import { fa } from '@faker-js/faker/.';
import { CreatePersonalTaskDto } from '@task/dto/personalTask/create-personal-task.dto';
import { UpdatePersonalTaskDto } from '@task/dto/personalTask/update-personal-task.dto';
import { CreateCheckInRuleDto } from '@task/dto/checkinRule/create-checkin-rule.dto';
import { Inject } from '@nestjs/common';
import { ICheckinRuleRepositoryToken, IListicleRepositoryToken } from 'src/common/token/tokens';
import { ICheckinRuleRepository } from './interfaces/checkin-rule.repository.interface';
import { ITagRepository } from './interfaces/tag.repository.interface';
import { IListicleRepository } from './interfaces/listicle.repository.interface';
import { generateSnowflakeId } from '@shared/lib/snowflake';
import { TaskTypeEnum } from '@shared/enum/TaskTypeEnum';

/**
 * personTask 需要直接携带tag的属性和listicle属性  前端会预加载所有的清单信息和标签信息  后端只需要返回tagids listile  cheinRuleId
 */
export class PersonalTaskRepository implements IPersonalTaskRepository {
  constructor(
    @InjectRepository(PersonalTask)
    private readonly personalTaskRepository: Repository<PersonalTask>,
    private readonly dataSource: DataSource,
    @Inject(ICheckinRuleRepositoryToken)
    private readonly checkinRuleRep: ICheckinRuleRepository,
    @Inject(IListicleRepositoryToken)
    private readonly tagRep: ITagRepository,
    @Inject(IListicleRepositoryToken)
    private readonly listicleRep: IListicleRepository
  ) {}

  async findPersonalTaskByTaskId(userId: string, taskId: string): Promise<any> {
    const sql = `
    SELECT 
  ${attributesPersonalTask}
    FROM personal_task pt
    WHERE pt.task_id=?
    AND  pt.created_by=?
    AND   pt.status=1
    `;
    const result = await this.dataSource.query(sql, [taskId, userId]);
    return result;
  }
  async findPersonalTaskWithTagAndListicleByTaskId(userId: string, taskId: string): Promise<any> {
    const sql = `
    SELECT 
        ${attributesPersonalTask}
          ptt.tag_id AS tagId
    FROM personal_task pt
    LEFT JOIN checkin_rule cr On cr.rule_id= pt.task_id
    LEFT JOIN listicle l On l.rule_id= pt.task_id
    LEFT JOIN personal_task_tag ptt ON ptt.personal_task_id = pt.task_id
    WHERE pt.task_id=?
    AND  pt.created_by=?
    AND cr.taks_type='${TaskTypeEnum.PERSONAL}'
    AND   pt.status=1
    `;
    const result = await this.dataSource.query(sql, [taskId, userId]);

    return result;
  }
  /**
   * @description   查找任务下一层数据 分页
   */
  async finPersonalTasksWithChildrensByTaskId(userId: string, parentTaskId: string, level: number = 0, nextCursor?: TaskLevelCursorDto): Promise<any> {
    let param: any[] = [userId, parentTaskId, level + 1];
    let cursorCondition = '';
    if (nextCursor?.createdAt && nextCursor?.taskId) {
      cursorCondition = `
       AND (
        pt.created_at < ? OR 
        (pt.created_at = ? AND pt.task_id < ?)
      );`;

      param.push(nextCursor.createdAt, nextCursor.createdAt, nextCursor.taskId);
    }

    const sql = `
    WITH RECURSIVE task_hierarchy AS (
      SELECT 
        p.*,
        ${level} AS level
      FROM personal_task p
      WHERE p.created_by = ? AND  p.task_id = ? 

      UNION ALL

      SELECT 
        child.*,
        th.level + 1 AS level
      FROM personal_task child
      JOIN task_hierarchy th ON child.task_parent_id = th.task_id
       WHERE th.level < 6  -- 限制最大层级为6
  
    )
    SELECT 
 ${attributesPersonalTask}
 ptt.tag_id AS tagId,
pt.level AS level
    FROM task_hierarchy pt
    LEFT JOIN checkin_rule cr ON pt.task_id = cr.rule_id
    LEFT JOIN listicle l ON pt.task_listicle_id = l.listicle_id
    LEFT JOIN personal_task_tag ptt ON ptt.personal_task_id = pt.task_id
    WHERE pt.level=?
     AND cr.taks_type='${TaskTypeEnum.PERSONAL}'
${cursorCondition}
  `;
    return await this.dataSource.query(sql, param);
  }

  /**
   * @description    最近的时间作为限制   一周 传入参数不定
   */
  async findPersonlTasksByUserIdFiltedByRencent(userId: string, filter: PersonalTaskFilterDto, limit: number = 10, nextCursor?: TaskUpdatedCursor): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    let filterSql = ``;
    let params: any[] = [userId];
    if (filter.updateStartTime && filter.updateEndTime) {
      filterSql += `
      AND
        pt.update_time BETWEEN ? AND ?`;
      params.push(filter.updateStartTime, filter.updateEndTime);
    }
    if (nextCursor?.updatedAt && nextCursor?.taskId) {
      filterSql = `
      AND (
        pt.updated_at < ? OR 
        (pt.updated_at = ? AND pt.task_id < ?)
      )
    `;
      params.push(nextCursor.updatedAt, nextCursor.updatedAt, nextCursor.taskId);
    }
    params.push(limit + 1);

    //查询出任务数据
    const stepOne = `
    SELECT 
    pt.task_id ,
  pt.task_title ,
  pt.task_priority,
  pt.task_parent_id ,
  pt.task_object_id ,
  pt.task_description ,
  pt.task_start_time ,
  pt.task_end_time ,
  pt.has_files ,
  pt.task_parentId ,

  cr.rule_type ,
  cr.days ,
  cr.times ,
  cr.interval_days,

  l.listicle_id ,

  pt.created_at ,
  pt.updated_at ,
  pt.created_by ,
  pt.updated_by ,
  pt.status 
    FROM personal_task pt
    LEFT JOIN checkin_rule cr ON pt.task_id = cr.rule_id
    LEFT JOIN listicle l ON pt.task_listicle_id = l.listicle_id
    WHERE  pt.created_by=?
     AND cr.taks_type='${TaskTypeEnum.PERSONAL}'
    ${filterSql}
     ORDER BY pt.updated_at DESC, pt.task_id DESC
    LIMIT ?
    `;
    const taskIdRows: { taskId: string }[] = await queryRunner.query(stepOne, params);
    if (taskIdRows.length === 0) {
      return { data: [], nextCursor: null, hasNextPage: false };
    }
    //联合标签

    const taskIds = taskIdRows.map((row) => row.taskId);
    const hasNext = taskIds.length > limit;
    const taskIdsLimited = taskIds.slice(0, limit);
    const placeholders = taskIdsLimited.map(() => '?').join(',');

    // Step 2: 查询详细任务信息（tag）
    const detailSql = `
      SELECT
         ${attributesPersonalTask}
ptt.tag_id AS  tagId
      FROM personal_task pt
      LEFT JOIN checkin_rule cr ON pt.task_id = cr.rule_id
      LEFT JOIN personal_task_tag ptt ON ptt.personal_task_id = pt.task_id
      WHERE pt.task_id IN (${placeholders});
       AND cr.taks_type='${TaskTypeEnum.PERSONAL}'
    `;
    const detailRows = await queryRunner.query(detailSql, taskIdsLimited);

    // Step 3: 聚合标签
    const groupedMap = new Map<string, any>();
    for (const row of detailRows) {
      if (!groupedMap.has(row.taskId)) {
        groupedMap.set(row.taskId, {
          ...row,
          tags: [],
        });
      }
      if (row.tagId) {
        groupedMap.get(row.taskId).tags.push({
          tagId: row.tagId,
          tagTtitle: row.tagTitle,
          tagColor: row.tagColor,
          tagDescription: row.tagDescription,
          parentId: row.tagParentId,
        });
      }
    }

    const tasks = Array.from(groupedMap.values());

    // Step 4: 计算 nextCursor
    const last = tasks[tasks.length - 1];
    const next = hasNext
      ? {
          createdAt: last.createdAt,
          taskId: last.taskId,
        }
      : null;

    return {
      data: groupedMap,
      nextCursor: next,
      hasNextPage: hasNext,
    };
  }
  async findPersonalTasksWithTagAndListicleByTagId(userId: string, tagId: string, limit: number, nextCursor?: TaskCursorDto): Promise<any> {
    //通过标签id去获取任务数据  获取所有任务标签id=>获取所有任务id 分页

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    //过滤规则
    let filterSql = '';

    //标签中任务不会重复 有的话仅有一个  获取的数据 不会重复
    const oneStepsql = `
    SELECT ptt.task_id
    FROM  personal_task_tag ptt
    WHERE ptt.tag_id=?
    `;
    const taskIdRows: { task_id: string }[] = await queryRunner.query(oneStepsql, [tagId]);
    if (taskIdRows.length === 0) {
      return { data: [], hasNextPage: false };
    }
    const taskIds = taskIdRows.map((row) => row.task_id);

    const placeholders = taskIds.map(() => '?').join(',');

    // 参数
    const params: any[] = [userId];

    if (nextCursor?.createdAt && nextCursor?.taskId) {
      filterSql = `
      AND (
        pt.created_at < ? OR 
        (pt.created_at = ? AND pt.task_id < ?)
      )
    `;
      params.push(nextCursor.createdAt, nextCursor.createdAt, nextCursor.taskId);
    }

    params.push(...taskIds);
    params.push(limit + 1); // 多查一条判断是否还有下一页
    // 通过任务id去获取任务 排序分页
    const detailSql = `
      SELECT
  ${attributesPersonalTask}
        0 AS level,
      FROM personal_task pt
      LEFT JOIN checkin_rule cr ON pt.task_id = cr.rule_id
      LEFT JOIN listicle l  ON pt.task_listicle_id = l.listicle_id
      WHERE pt.created_by=?
      AND pt.task_id IN (${placeholders});
       AND cr.taks_type='${TaskTypeEnum.PERSONAL}'
  ${filterSql}
  ORDER BY pt.created_at DESC, pt.task_id DESC
      LIMIT ?

    `;

    //查询
    const detailRows = await queryRunner.query(detailSql, params);

    // Step 3: 聚合标签
    const groupedMap = new Map<string, any>();
    for (const row of detailRows) {
      if (!groupedMap.has(row.taskId)) {
        groupedMap.set(row.taskId, {
          ...row,
          tags: [],
        });
      }
      if (row.tagId) {
        groupedMap.get(row.taskId).tags.push({
          listicleId: row.listicleId,
          listileIcon: row.listicleIcon,
          listicleTitle: row.listicelTitle,
          listicleType: row.listicleType,
          parentId: row.listicleParentId,
        });
      }
    }

    const tasks = Array.from(groupedMap.values());

    // Step 4: 计算 nextCursor
    const last = tasks[tasks.length - 1];
    const next = last
      ? {
          createdAt: last.createdAt,
          taskId: last.taskId,
        }
      : null;

    return {
      data: tasks,
      hasNextPage: !!last,
      nextCursor: next,
    };
  }
  /**
   * @description 按照标签获取任务  首先获取的是最顶级任务
   */
  async findPersonalTasksWithTagAndListicleByListicleId(userId: string, listicleId: string, limit: number, nextCursor?: TaskCursorDto): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    let filterSql = '';
    const params: any[] = [userId, listicleId];

    if (nextCursor?.createdAt && nextCursor?.taskId) {
      filterSql = `
      AND (
        pt.created_at < ? OR 
        (pt.created_at = ? AND pt.task_id < ?)
      )
    `;
      params.push(nextCursor.createdAt, nextCursor.createdAt, nextCursor.taskId);
    }

    params.push(limit + 1); // 多查一条判断是否还有下一页

    try {
      // Step 1: 查询 taskId（分页 + 游标）
      const idSql = `
      SELECT pt.task_id
      FROM personal_task pt
      WHERE pt.created_by = ?
        AND pt.listicle_id = ?
        AND (pt.parent_id IS NULL OR pt.parent_id = '')
        AND pt.status = 1
        ${filterSql}
      ORDER BY pt.created_at DESC, pt.task_id DESC
      LIMIT ?;
    `;
      const taskIdRows: { task_id: string }[] = await queryRunner.query(idSql, params);

      if (taskIdRows.length === 0) {
        return { data: [], hasNextPage: false };
      }

      const taskIds = taskIdRows.map((row) => row.task_id);
      const hasNextPage = taskIds.length > limit;
      const taskIdsLimited = taskIds.slice(0, limit);
      const placeholders = taskIdsLimited.map(() => '?').join(',');

      // Step 2: 查询详细任务信息（tag、checkin_rule）
      const detailSql = `
      SELECT
    ${attributesPersonalTask}
        0 AS level,
        cr.rule_name AS checkinRuleName,
        t.tag_id AS tagId,
        t.tag_name AS tagName
      FROM personal_task pt
      LEFT JOIN checkin_rule cr ON pt.task_id = cr.rule_id
      LEFT JOIN personal_task_tag ptt ON ptt.personal_task_id = pt.task_id
      WHERE pt.task_id IN (${placeholders});
       AND cr.taks_type='${TaskTypeEnum.PERSONAL}'
    `;
      const detailRows = await queryRunner.query(detailSql, taskIdsLimited);

      // Step 3: 聚合标签
      const groupedMap = new Map<string, any>();
      for (const row of detailRows) {
        if (!groupedMap.has(row.taskId)) {
          groupedMap.set(row.taskId, {
            ...row,
            tags: [],
          });
        }
        if (row.tagId) {
          groupedMap.get(row.taskId).tags.push({
            tagId: row.tagId,
            tagTtitle: row.tagTitle,
            tagColor: row.tagColor,
            tagDescription: row.tagDescription,
            parentId: row.tagParentId,
          });
        }
      }

      const tasks = Array.from(groupedMap.values());

      // Step 4: 计算 nextCursor
      const last = tasks[tasks.length - 1];
      const nextCursor = hasNextPage
        ? {
            createdAt: last.createdAt,
            taskId: last.taskId,
          }
        : null;

      return {
        data: tasks,
        hasNextPage,
        nextCursor,
      };
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * @description   通过条件查询任务   一定有时间分区去限制最顶级任务  获取
   * @param userId
   * @param limit
   * @param filter
   * @param nextCursor
   */
  async findPersonTasksByFilter(userId: string, limit: number, startTime: Date, endTime: Date, nextCursor?: TaskCursorDto): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    //获取时间范围内的最顶级任务  携带了清单上和打卡id信息  打卡id不需要使用
    const sqlRow = `
WITH RECURSIVE task_hierarchy AS (
    -- 基础查询：选择根节点（第一层任务）
    SELECT 
        p.task_id,
        p.task_title,
        p.task_priority,
        p.task_parent_id,
        p.task_object_id,
        p.task_description,
        p.task_start_time,
        p.task_end_time,
        p.has_files,
        p.listicle_id,
        p.created_at,
        p.updated_at,
        p.created_by,
        p.updated_by,
        p.status,
        0 AS level
    FROM personal_task p
    WHERE p.created_by=? 
    AND (p.task_parent_id IS NULL OR p.task_parent_id = 0 OR p.task_parent_id = '')
      AND p.created_at BETWEEN ? AND ?
    
    UNION ALL
    
    -- 递归查询：选择子任务
    SELECT 
        cpt.task_id,
        cpt.task_title,
        cpt.task_priority,
        cpt.task_parent_id,
        cpt.task_object_id,
        cpt.task_description,
        cpt.task_start_time,
        cpt.task_end_time,
        cpt.has_files,
        cpt.listicle_id,
        cpt.created_at,
        cpt.updated_at,
        cpt.created_by,
        cpt.updated_by,
        cpt.status,
        th.level + 1 AS level  
    FROM personal_task cpt
    JOIN task_hierarchy th ON cpt.task_parent_id = th.task_id
    WHERE th.level < 6
)
SELECT 
${attributesPersonalTask},
pt.level AS level
FROM task_hierarchy pt

`;
    const taskIdRows = await queryRunner.query(sqlRow, [userId, startTime, endTime]);
    if (taskIdRows.length === 0) {
      return [];
    }

    const taskIds = taskIdRows.map((row) => row.task_id);
    const taskIdsLimited = taskIds.slice(0, limit);
    const placeholders = taskIdsLimited.map(() => '?').join(',');

    //携带标签信息- personal_task_tag的task_id去查询tagIds
    const sqlWithTagIds = `   
          SELECT ptt.task_id AS taskId  ptt.tag_id AS  tagId
      FROM personal_task_tag ptt
      WHERE ptt.task_id IN (${placeholders})`;
    const TaskTagIds = await queryRunner.query(sqlWithTagIds, []);
    return { tasks: taskIdRows, taskTag: TaskTagIds };
  }

  //
  async updatePersonalTask(userId: string, dto: UpdatePersonalTaskDto): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    //如果有新增清单->生成新的清单id
    const listicleId = dto.listicleId ?? generateSnowflakeId();
    //标签是  +生成新增标签-删除id

    try {
      const updates: string[] = [];
      const params: any[] = [];

      const fields = {
        taskTitle: 'task_title',
        taskPriority: 'task_priority',
        taskParentId: 'task_parent_id',
        taskDescription: 'task_description',
        taskStartTime: 'task_start_time',
        taskEndTime: 'task_end_time',
        listicleId: 'listicle_id',
        hasFiles: 'has_files',
      };

      for (const key in fields) {
        if (key === 'listicleId' && dto.addNewListicle && dto.listicleId === undefined) {
          updates.push(`${fields[key]} = ?`);
          params.push(listicleId); // 使用新生成清单 ID
        } else if (dto[key] !== undefined) {
          updates.push(`${fields[key]} = ?`);
          params.push(dto[key]);
        }
      }

      params.push(dto.taskId); // WHERE 条件
      const sql = `
      UPDATE personal_task
      SET ${updates.join(', ')}
      WHERE task_id = ?;
    `;
      await queryRunner.query(sql, params);

      //  同步更新打卡规则（可选）
      if (dto.addCheckInRule) {
        await this.checkinRuleRep.createCheckinRule(userId, dto.taskId, dto.addCheckInRule);
      }

      //同步新疆清单

      if (dto.addNewListicle && dto.listicleId === undefined && dto.listicleId !== listicleId) {
        await this.listicleRep.createListicle(listicleId, dto.addNewListicle);
      }
      // 获取已有标签 ID
      let tagIds = dto.addTagIds ?? [];

      // 创建新增的标签
      if (dto.addNewTag) {
        const newTagId = generateSnowflakeId();
        await this.tagRep.createTag(newTagId, dto.addNewTag);
        tagIds.push(newTagId); // 将新建的标签加入 tagIds 数组
      }

      // 如果有任何标签需要添加（包括已有和新建）
      if (tagIds.length > 0) {
        const now = new Date().toISOString();

        const values = tagIds.map((tagId) => [
          generateSnowflakeId(),
          dto.taskId,
          tagId,
          userId,
          now,
          now,
          1, // status
        ]);

        const valueStrings = values.map(() => `(?, ?, ?, ?, ?, ?, ?)`).join(',');

        const flatParams = values.flat();

        await queryRunner.query(
          `
    INSERT INTO personal_task_tag 
      (personal_task_tag_id, task_id, tag_id, created_by, created_at, update_at, status)
    VALUES ${valueStrings}
    `,
          flatParams
        );
      }

      if (dto.deletedTags && dto.deletedTags.length > 0) {
        const placeholders = dto.deletedTags.map(() => '?').join(',');
        const deleteParams = [userId, dto.taskId, ...dto.deletedTags];

        await queryRunner.query(
          `DELETE FROM personal_task_tag 
     WHERE created_by = ? AND task_id = ? AND tag_id IN (${placeholders})`,
          deleteParams
        );
      }

      await queryRunner.commitTransaction();
      return { success: true };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error(`更新失败：${(err as any).message}`);
    } finally {
      await queryRunner.release();
    }
  }

  //创建新的任务 同步修改任务标签表
  async createdPersonalTask(userId: any, dto: CreatePersonalTaskDto): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const now = new Date().toISOString();
    const id = generateSnowflakeId();

    // 如果没有 dto，直接返回
    if (!dto) {
      return null;
    }

    try {
      const params: any[] = [id]; // 第一个是 task_id

      const fields = {
        taskTitle: 'task_title',
        taskPriority: 'task_priority',
        taskParentId: 'task_parent_id',
        taskDescription: 'task_description',
        taskStartTime: 'task_start_time',
        taskEndTime: 'task_end_time',
        listicleId: 'listicle_id',
        hasFiles: 'has_files',
      };

      for (const key in fields) {
        params.push(dto[key] ?? null); // 防止 undefined 导致 SQL 报错
      }

      // 添加附加字段
      params.push(
        null, // task_object_id
        now, // created_at
        now, // updated_at
        userId, // created_by
        userId, // updated_by
        1 // status
      );

      const sql = `
    INSERT INTO personal_task (
      task_id, 
      task_title,
      task_priority, 
      task_parent_id, 
      task_description, 
      task_start_time,
      task_end_time, 
      listicle_id, 
      has_files,
      task_object_id, 
      created_at,
      updated_at,
      created_by, 
      updated_by,
      status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
      // 写入
      await queryRunner.query(sql, params);
      //判断打卡规则
      if (dto.addCheckInRule) {
        await this.checkinRuleRep.createCheckinRule(userId, id, dto.addCheckInRule);
      }
      //判断标签id
      // 如果有任何标签需要添加（包括已有和新建）
      if (Array.isArray(dto?.addTagIds) && dto.addTagIds.length > 0) {
        // const now = new Date().toISOString();

        const values = dto.addTagIds.map((tagId) => [
          generateSnowflakeId(),
          id,
          tagId,
          userId,
          now,
          now,
          1, // status
        ]);

        const valueStrings = values.map(() => `(?, ?, ?, ?, ?, ?, ?)`).join(',');

        const flatParams = values.flat();

        await queryRunner.query(
          `
    INSERT INTO personal_task_tag 
      (personal_task_tag_id, task_id, tag_id, created_by, created_at, update_at, status)
    VALUES ${valueStrings}
    `,
          flatParams
        );
      }
      await queryRunner.commitTransaction();
      return { success: true };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(`创建失败：${(error as any).message}`);
    } finally {
      await queryRunner.release();
    }

    throw new Error('Method not implemented.');
  }
  async deletePersonalTask(userId: any, taskId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  //获取xx时间之后所有修改的任务   需要判断上下级关系  如果改变做出处理
  async findPersonalTaskUpdate(userId: string, time: Date): Promise<any[]> {
    const sql = `
    SELECT  
    ${attributesPersonalTask}
  FROM personal_Task  pt 
  LEFT JOIN  check_rule c 
  WHERE pt.update_at >?
  AND    pt.create_by=?
    `;
    const result = await this.dataSource.query(sql, [time, userId]);
    return result;
  }
}
