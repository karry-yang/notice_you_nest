import { InjectRepository } from '@nestjs/typeorm';
import { IPersonalTaskRepository } from './interfaces/personal-task.repository.interface';
import { PersonalTask } from '@task/entities/personal-task.entity';
import { encodeCursor, PaginatedResult, TaskUpdatedCursor } from 'src/common/types/paginatedResult.interface';
import { DataSource, Repository } from 'typeorm';
import { TaskCursorDto, TaskLevelCursorDto } from 'src/common/dto/paginatedResult.dto';
import { PersonalTaskFilterDto } from '@task/dto/personalTask/psersonal-task-filter.dto';
import { attributesPersonalTask } from './sql';
import { CreatePersonalTaskDto } from '@task/dto/personalTask/create-personal-task.dto';
import { UpdatePersonalTaskDto } from '@task/dto/personalTask/update-personal-task.dto';
import { Inject } from '@nestjs/common';
import { ICheckinRuleRepositoryToken, IListicleRepositoryToken } from 'src/common/token/tokens';
import { ICheckinRuleRepository } from './interfaces/checkin-rule.repository.interface';
import { ITagRepository } from './interfaces/tag.repository.interface';
import { IListicleRepository } from './interfaces/listicle.repository.interface';
import { generateSnowflakeId } from '@shared/lib/snowflake';
import { TaskTypeEnum } from '@shared/enum/TaskTypeEnum';
import { RepositoryPersonalTaskDto } from '@task/dto/personalTask/reposotory-personal-task.dto';
import { ne } from '@faker-js/faker/.';
import { TaskStatusEnum } from '@shared/enum/TaskStatusEnum';
import { DetailPersonalTaskDto } from '@task/dto/personalTask/detail-personal-task.dto';
import { CheckinRule } from '@task/entities/task-checkin-rule.entity';
import { SimpleCheckinRuleDto } from '@task/dto/checkinRule/simple-checkin-rule.dto';

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

  async findPersonalTaskByTaskId(userId: string, taskId: string): Promise<RepositoryPersonalTaskDto | null> {
    const sql = `
    SELECT 
      ${attributesPersonalTask}
    FROM personal_task pt
    WHERE pt.task_id = ?
      AND pt.created_by = ?
      AND pt.status = 1
    LIMIT 1
  `;
    const result = await this.dataSource.query(sql, [taskId, userId]);
    return result[0] ?? null;
  }

  async findPersonalTaskWithTagAndListicleByTaskId(userId: string, taskId: string): Promise<RepositoryPersonalTaskDto[] | null> {
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
  async finPersonalTasksWithChildrensByTaskId(
    userId: string,
    parentTaskId: string,
    level: number = 0,
    limit: number = 10,
    nextCursor?: TaskCursorDto
  ): Promise<PaginatedResult<RepositoryPersonalTaskDto> | null> {
    let param: any[] = [userId, parentTaskId, level + 1, level + 1];
    let cursorCondition = '';
    if (nextCursor?.createdAt && nextCursor?.taskId) {
      cursorCondition = `
       AND (
        pt.created_at < ? OR 
        (pt.created_at = ? AND pt.task_id < ?)
      );`;

      param.push(nextCursor.createdAt, nextCursor.createdAt, nextCursor.taskId);
    }
    param.push(limit + 1);
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
       AND th.level=?
  
    )
    SELECT 
pt *
    FROM task_hierarchy pt
    LEFT JOIN checkin_rule cr ON pt.task_id = cr.rule_id
    WHERE pt.level=?
     AND cr.taks_type='${TaskTypeEnum.PERSONAL}'
${cursorCondition}
Limit ?
 ORDER BY pt.updated_at DESC, pt.task_id DESC
  `;
    const rawResults = await this.dataSource.query(sql, param);
    if (rawResults.length <= 0) {
      return null;
    }
    //计算浮标
    const taskIds = rawResults.map((row) => row.taskId);
    const temp: { task_id: string; created_at: string } = taskIds;
    const hasNext = taskIds.length > limit;
    const taskIdsLimited = taskIds.slice(0, limit);
    const placeholders = taskIdsLimited.map(() => '?').join(',');

    // 获取tagid
    const detailResults = await this.dataSource.query(`SELECT ${attributesPersonalTask},pt.tag_id AS tagId, pt.level AS level  FROM personal_task_tag  WHERE task_id IN (${placeholders}) `);
    //通过id获取任务具备的tagids

    const tasks = Array.from(rawResults.values());

    // Step 4: 计算 nextCursor
    const last = temp[tasks.length - 1];
    const next = hasNext
      ? {
          createdAt: last.createdAt,
          taskId: last.taskId,
        }
      : null;

    return {
      data: detailResults,
      nextCursor: next ? encodeCursor(next, 'TaskUpdatedCursor') : null,
      hasNextPage: hasNext,
    };
  }

  /**
   * @description    最近的时间作为限制   一周 传入参数不定
   */
  async findPersonlTasksByUserIdFiltedByRencent(
    userId: string,
    filter: PersonalTaskFilterDto,
    limit: number = 10,
    nextCursor?: TaskUpdatedCursor
  ): Promise<PaginatedResult<RepositoryPersonalTaskDto> | null> {
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

  pt.listicle_id ,

  pt.created_at ,
  pt.updated_at ,
  pt.created_by ,
  pt.updated_by ,
  pt.status 
    FROM personal_task pt
    LEFT JOIN checkin_rule cr ON pt.task_id = cr.rule_id
    WHERE  pt.created_by=?
    ${filterSql}
     ORDER BY pt.updated_at DESC, pt.task_id DESC
    LIMIT ?
    `;
    const taskIdRows: { taskId: string; createdAt: string }[] = await queryRunner.query(stepOne, params);
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
          ORDER BY pt.updated_at DESC, pt.task_id DESC
    `;
    const detailRows = await queryRunner.query(detailSql, taskIdsLimited);

    const tasks = Array.from(taskIdRows.values());

    // Step 4: 计算 nextCursor
    const last = tasks[tasks.length - 1];
    const next = hasNext
      ? {
          createdAt: last.createdAt,
          taskId: last.taskId,
        }
      : null;

    return {
      data: detailRows,
      nextCursor: next ? encodeCursor(next, 'TaskUpdatedCursor') : null,
      hasNextPage: hasNext,
    };
  }
  async findPersonalTasksWithTagAndListicleByTagId(userId: string, tagId: string, limit: number, nextCursor?: TaskCursorDto): Promise<PaginatedResult<RepositoryPersonalTaskDto> | null> {
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
     AND (
        ptt.created_at < ? OR 
        (ptt.created_at = ? AND ptt.task_id < ?)
      )
     LIMIT ?
    `;
    const taskIdRows: { task_id: string; created_at }[] = await queryRunner.query(oneStepsql, [tagId, nextCursor?.createdAt, nextCursor?.createdAt, nextCursor?.taskId]);
    if (taskIdRows.length === 0) {
      return { data: [], nextCursor: null, hasNextPage: false };
    }
    const taskIds = taskIdRows.map((row) => row.task_id);

    const placeholders = taskIds.map(() => '?').join(',');

    const detailSql = `
      SELECT
  ${attributesPersonalTask}
  ptt.tag_id AS  tagId,
        0 AS level
      FROM personal_task pt
      LEFT JOIN checkin_rule cr ON pt.task_id = cr.rule_id
       LEFT JOIN personal_task_tag ptt ON ptt.personal_task_id = pt.task_id
      WHERE pt.created_by=?
      AND pt.task_id IN (${placeholders});
       AND cr.taks_type='${TaskTypeEnum.PERSONAL}'
  ORDER BY pt.created_at DESC, pt.task_id DESC
    `;

    //查询
    const detailRows = await queryRunner.query(detailSql, [userId]);

    const tasks = Array.from(taskIdRows.values());

    // Step 4: 计算 nextCursor
    const last = tasks[tasks.length - 1];
    const next = last
      ? {
          createdAt: last.created_at,
          taskId: last.task_id,
        }
      : null;

    return {
      data: detailRows,
      hasNextPage: !!last,
      nextCursor: next ? encodeCursor(next, 'TaskCursor') : null,
    };
  }
  /**
   * @description 按照标签获取任务  首先获取的是最顶级任务
   */
  async findPersonalTasksWithTagAndListicleByListicleId(userId: string, listicleId: string, limit: number, nextCursor?: TaskCursorDto): Promise<PaginatedResult<RepositoryPersonalTaskDto>> {
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
      const taskIdRows: { task_id: string; created_at: string }[] = await queryRunner.query(idSql, params);

      if (taskIdRows.length === 0) {
        return { data: [], nextCursor: null, hasNextPage: false };
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

      const tasks = Array.from(taskIdRows.values());

      // Step 4: 计算 nextCursor
      const last = tasks[tasks.length - 1];
      const next = hasNextPage
        ? {
            createdAt: last.created_at,
            taskId: last.task_id,
          }
        : null;

      return {
        data: detailRows,
        hasNextPage: !!last,
        nextCursor: next ? encodeCursor(next, 'TaskCursor') : null,
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
  async findPersonTasksByFilter(
    userId: string,
    startTime: string,
    endTime: string,
    limit: number,
    nextCursor?: TaskCursorDto
  ): Promise<PaginatedResult<{
    tasks: RepositoryPersonalTaskDto[];
    taskTag: { taskId: string; tagId: string }[];
  }> | null> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    let cursorCondition = ``;
    if (nextCursor?.createdAt && nextCursor?.taskId) {
      cursorCondition = `
       AND (
        pt.created_at < ? OR 
        (pt.created_at = ? AND pt.task_id < ?)
      );`;
    }
    try {
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
WHERE 1=1
${cursorCondition}

;`;

      const taskIdRows = await queryRunner.query(sqlRow, [userId, startTime, endTime, limit + 1, nextCursor?.createdAt, nextCursor?.createdAt, nextCursor?.taskId]);

      if (taskIdRows.length === 0) {
        return {
          data: [],
          nextCursor: null,
          hasNextPage: false,
        };
      }

      const limitedTasks = taskIdRows.slice(0, limit);
      const taskIds = limitedTasks.map((t) => t.task_id);

      const placeholders = taskIds.map(() => '?').join(',');
      const sqlWithTagIds = `
      SELECT ptt.task_id AS taskId, ptt.tag_id AS tagId
      FROM personal_task_tag ptt
      WHERE ptt.task_id IN (${placeholders})`;

      const TaskTagIds = await queryRunner.query(sqlWithTagIds, taskIds);

      return {
        data: [
          {
            tasks: limitedTasks,
            taskTag: TaskTagIds,
          },
        ],
        nextCursor: limitedTasks.length === limit ? limitedTasks[limitedTasks.length - 1].task_id : null,
        hasNextPage: taskIdRows.length > limit,
      };
    } finally {
      await queryRunner.release();
    }
  }

  //
  async updatePersonalTask(userId: string, dto: UpdatePersonalTaskDto): Promise<string> {
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
      return dto.taskId;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error(`更新失败：${(err as any).message}`);
    } finally {
      await queryRunner.release();
    }
  }

  //创建新的任务 同步修改任务标签表
  async createdPersonalTask(userId: any, dto: CreatePersonalTaskDto): Promise<string | null> {
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
      return id;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(`创建失败：${(error as any).message}`);
    } finally {
      await queryRunner.release();
    }
  }
  async deletePersonalTask(userId: string, taskIds: string[]): Promise<string[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const deletedIds: string[] = [];

      for (const taskId of taskIds) {
        const result = await queryRunner.query(`DELETE FROM personal_task WHERE task_id = ? AND created_by = ?`, [taskId, userId]);

        const affected = result?.affectedRows ?? result?.affected ?? 0;

        if (affected > 0) {
          deletedIds.push(taskId);
        }
      }

      await queryRunner.commitTransaction();
      return deletedIds;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error(`删除任务失败：${(err as any).message}`);
    } finally {
      await queryRunner.release();
    }
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
  AND pt.status=1
    `;
    const result = await this.dataSource.query(sql, [time, userId]);
    return result;
  }

  async logicDeletePersonalTask(userId: string, taskIds: string[]): Promise<string[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const successTaskIds: string[] = [];

    try {
      for (const taskId of taskIds) {
        const result = await queryRunner.query(
          `UPDATE personal_task
         SET status = ?, updated_at = NOW()
         WHERE task_id = ? AND created_by = ? AND status != ?`,
          [TaskStatusEnum.DELETED, taskId, userId, TaskStatusEnum.DELETED]
        );

        const affected = result[0]?.affectedRows ?? 0;
        if (affected > 0) {
          successTaskIds.push(taskId);

          // 删除相关联表数据
          await queryRunner.query(
            `
          UPDATE checkin_rule
          SET status = ?, updated_at = NOW()
          WHERE task_id = ?`,
            [TaskStatusEnum.DELETED, taskId]
          );

          await queryRunner.query(
            `
          UPDATE personal_task_checkin
          SET status = ?, updated_at = NOW()
          WHERE task_id = ?`,
            [TaskStatusEnum.DELETED, taskId]
          );

          await queryRunner.query(
            `
          UPDATE personal_task_tag
          SET is_deleted = 1, updated_at = NOW()
          WHERE task_id = ?`,
            [TaskStatusEnum.DELETED, taskId]
          );
        }
      }

      await queryRunner.commitTransaction();
      return successTaskIds;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error('逻辑删除失败: ' + (err as any).message);
    } finally {
      await queryRunner.release();
    }
  }
  async findTopPersonalTasksByUserId(userId: string, nextCursor: TaskCursorDto, limit: number = 10): Promise<PaginatedResult<RepositoryPersonalTaskDto> | null> {
    //解析nextCursor
    let cursorConditionSql = ` `;
    let param: any[] = [userId];
    if (nextCursor?.createdAt && nextCursor?.taskId) {
      cursorConditionSql = ` AND (
        ptt.created_at < ? OR 
        (ptt.created_at = ? AND ptt.task_id < ?)
      )`;
      param.push(nextCursor.createdAt, nextCursor.createdAt, nextCursor.taskId);
    }
    //查询所有的taskId
    const sql = `
    SELECT  p.task_id ,created_at
FROM personal_task p 
WHERE p.created_at=?
  ${cursorConditionSql}
 ORDER BY pt.created_at DESC, pt.task_id DESC
 LIMIT ?
    `;
    param.push(limit + 1);
    const rawResults = await this.dataSource.query(sql, param);
    if (rawResults?.length <= 0) {
      return null;
    }
    //计算浮标
    const taskIds = rawResults.map((row) => row.taskId);
    const temp: { task_id: string; created_at: string } = taskIds;
    const hasNext = taskIds.length > limit;
    const taskIdsLimited = taskIds.slice(0, limit);
    const placeholders = taskIdsLimited.map(() => '?').join(',');

    // 获取tagid
    const detailResults = await this.dataSource.query(`SELECT ${attributesPersonalTask},pt.tag_id AS tagId, 0 AS level  FROM personal_task_tag  WHERE task_id IN (${placeholders}) `);
    //通过id获取任务具备的tagids

    const tasks = Array.from(rawResults.values());

    // Step 4: 计算 nextCursor
    const last = temp[tasks.length - 1];
    const next = hasNext
      ? {
          createdAt: last.createdAt,
          taskId: last.taskId,
        }
      : null;

    return {
      data: detailResults,
      nextCursor: next ? encodeCursor(next, 'TaskUpdatedCursor') : null,
      hasNextPage: hasNext,
    };
  }

  private isRuleValidForDate(rule: CheckinRule, date: Date): boolean {
    const dayOfWeek = date.getDay(); // 0: Sunday - 6: Saturday
    const dayOfMonth = date.getDate(); // 1 - 31
    const daysString = Array.isArray(rule.days) ? JSON.stringify(rule.days) : (rule.days ?? '[]');

    let weekDays: number[] = [];
    let monthDays: number[] = [];
    if (rule.ruleType === 'WEEKLY') {
      weekDays = JSON.parse(daysString);
    }
    if (rule.ruleType === 'MONTHLY') {
      monthDays = JSON.parse(daysString);
    }

    switch (rule.ruleType) {
      case 'DAILY':
        return true;

      case 'WEEKLY':
        return weekDays.includes(dayOfWeek);

      case 'MONTHLY':
        return monthDays.includes(dayOfMonth);

      case 'INTERVAL': {
        if (!rule.intervalDays) return false;
        const createdAt = new Date(rule.createdAt);
        const diff = Math.floor((date.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
        return diff % rule.intervalDays === 0;
      }

      default:
        return false;
    }
  }

  private getTomorrowDate(): Date {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // start of the day
    return tomorrow;
  }

  async findPersonalTaskForTomorrow(userId: string, nextCursor: TaskCursorDto, limit: number = 10): Promise<PaginatedResult<RepositoryPersonalTaskDto> | null> {
    const tomorrow = this.getTomorrowDate();
    let cursorConditionSql = ` `;

    const rules = await this.dataSource.query(
      `
    SELECT 
    rule_id   AS ruleId
    rule_type AS ruleType
    days  AS days
    times  AS  times
    interval_days AS intervalDays
    FROM  checkcin_rule 
    WHERE created_at=?
    `,
      [userId]
    );

    const validRuleIds: string[] = (rules as SimpleCheckinRuleDto[])
      .filter((rule: SimpleCheckinRuleDto) => this.isRuleValidForDate(rule as CheckinRule, tomorrow))
      .map((rule: SimpleCheckinRuleDto) => rule.ruleId)
      .filter((id): id is string => typeof id === 'string' && id !== undefined);

    if (validRuleIds.length === 0) return null;

    let param: any[] = [userId, ...validRuleIds];
    if (nextCursor?.createdAt && nextCursor?.taskId) {
      cursorConditionSql = ` AND (
        pt.created_at < ? OR 
        (pt.created_at = ? AND pt.task_id < ?)
      )`;
      param.push(nextCursor.createdAt, nextCursor.createdAt, nextCursor.taskId);
    }
    param.push(limit + 1);
    // 3. 查询符合规则的任务（假设 task 表中有 rule_id 字段）
    const tasks = await this.dataSource.query(
      `SELECT 
          ${attributesPersonalTask},
          ptt.tag_id AS  tagId
        FROM personal_task pt
        WHERE pt.task_id in ${validRuleIds}
        LEFT JOIN checkin_rule cr ON pt.task_id = cr.rule_id
        LEFT JOIN personal_task_tag ptt ON ptt.personal_task_id = pt.task_id
             AND ${cursorConditionSql}
       ORDER BY pt.created_at DESC, pt.task_id DESC
        LIMIT ?
    `,
      param
    );

    //判断浮标  不同点在于  这里使用的是validRuleIds的长度判断是否有下一页
    const hasNext = validRuleIds.length >= limit;
    const next: { taskId: string; createdAt: string } = tasks[tasks.length - 1];
    return {
      data: tasks,
      nextCursor: hasNext ? encodeCursor(next, 'taskCursor') : null,
      hasNextPage: hasNext,
    };
  }
}
