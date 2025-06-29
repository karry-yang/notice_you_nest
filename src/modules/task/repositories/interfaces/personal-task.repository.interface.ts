import { PersonalTaskFilterDto } from '@task/dto/personalTask/psersonal-task-filter.dto';
import { PersonalTask } from '@task/entities/personal-task.entity';
import { TaskCursorDto, TaskLevelCursorDto, TaskUpdatedCursorDto } from 'src/common/dto/paginatedResult.dto';
import { PaginatedResult } from 'src/common/types/paginatedResult.interface';
import { CreatePersonalTaskDto } from '@task/dto/personalTask/create-personal-task.dto';
import { UpdatePersonalTaskDto } from '@task/dto/personalTask/update-personal-task.dto';
import { RepositoryPersonalTaskDto } from '@task/dto/personalTask/reposotory-personal-task.dto';
import { an } from '@faker-js/faker/dist/airline-BUL6NtOJ';
import { TaskStatusEnum } from '@shared/enum/TaskStatusEnum';
import { RowStatusEnum } from '@shared/enum/RowStatusEnum';

/**
 *标签是多对多的关系关系 

*/
export interface IPersonalTaskRepository {
  /**
   * @description  查询的是个人任务对象+checkinrule
   * @param userId  限制查询的数据是personalTask.createdAt=userId
   * @param id  personalTask.taskId=id
   * @returns aRepositoryPersonalTaskDto || null  (不携带清单和标签ids)
   * @see{@link RepositoryPersonalTaskDto}
   */
  findPersonalTaskByTaskId(userId: string, taskId: string): Promise<RepositoryPersonalTaskDto | null>;

  /**
   * @description  查询的是个人任务对象+rule+tag+licticle
   * @param userId  限制查询的数据是personalTask.createdAt=userId
   * @param taskId  personalTask.taskId=id
   * @returns   RepositoryPersonalTaskDto
   *    * @see{@link RepositoryPersonalTaskDto}
   */
  findPersonalTaskWithTagAndListicleByTaskId(userId: string, taskId: string): Promise<RepositoryPersonalTaskDto[] | null>;

  /**
   * @description  查询的是个人任务对象+rule+tag+licticle+children+level   获取的是任务id下的所有子任务数据，平铺展示  每层展示的数据应该不超过十个子任务
   * @param userId  限制查询的数据是personalTask.createdAt=userId
   * @param parentId  personalTask.taskId=parentId
   * @param level 父级任务的等级   用于避免避免重复获取和子任务的等级划分
   * @returns  PaginatedResult<RepositoryPersonalTaskDto> | null>;
   * @see {@link PaginatedResult}
   * @see{@link RepositoryPersonalTaskDto}
   */
  finPersonalTasksWithChildrensByTaskId(userId: string, parentId: string, level: number, limit: number, nextCousor?: TaskCursorDto): Promise<PaginatedResult<RepositoryPersonalTaskDto> | null>;
  /**
   * @description  获取过滤器(时间，标签，最新打卡状态)范围内的任务 分页不 分层
   * @param userId  限制查询的数据是personalTask.createdAt=userId
   * @param filter  {@link PersonalTaskFilterDto}  过滤器(orderBy不用，在service层处理)
   * @param  limit 限制数量
   * @param nextCursor--{@link TaskCursorDto}  可选参数 首次加载没有浮标
   * @returns  PaginatedResult<RepositoryPersonalTaskDto> | null
   * @see {@link PaginatedResult}
   * @see{@link RepositoryPersonalTaskDto}
   */
  findPersonlTasksByUserIdFiltedByRencent(userId: string, filter: PersonalTaskFilterDto, limit: number, nextCursor?: TaskUpdatedCursorDto): Promise<PaginatedResult<RepositoryPersonalTaskDto> | null>;

  /**
   * @description  通过tagId获取任务 十个最近的顶级任务  携带一层子任务  平铺  分页分层
   * @param userId  限制查询的数据是personalTask.createdAt=userId
   * @param tagId  标签id
   * @param  limit 限制数量
   * @param nextCursor--{@link TaskCursorDto}  可选参数 首次加载没有浮标
   * @returns any
   * @see {@link PaginatedResult}
   * @see{@link RepositoryPersonalTaskDto}
   */
  findPersonalTasksWithTagAndListicleByTagId(userId: string, tagId: string, limit: number, nextCursor?: TaskCursorDto): Promise<PaginatedResult<RepositoryPersonalTaskDto> | null>;

  /**
   * @description  通过tlicticleId获取任务 十个最近的顶级任务  携带一层子任务  平铺  分页分层
   * @param userId  限制查询的数据是personalTask.createdAt=userId
   * @param listicleId  清单id
   * @param  limit 限制数量
   * @param nextCursor--{@link TaskCursorDto}  可选参数 首次加载没有浮标
   * @returns  PaginatedResult<RepositoryPersonalTaskDto> | null
   * @see {@link PaginatedResult}
   * @see{@link RepositoryPersonalTaskDto}
   */
  findPersonalTasksWithTagAndListicleByListicleId(userId: string, listicleId: string, limit: number, nextCursor: TaskCursorDto): Promise<PaginatedResult<RepositoryPersonalTaskDto> | null>;

  /**
   * @description  分页 分层  获取的是每个清单的前十条顶级任务  分页分层  携带子任务  不分组  分组在service进行
   * @param userId
   * @param startTime
   * @param endTime
   * @param limit
   * @param nextCursor?
   * @returns PaginatedResult<RepositoryPersonalTaskDto> | null
   * @see {@link PaginatedResult}
   * @see{@link RepositoryPersonalTaskDto}
   */
  findPersonTasksByFilter(
    userId: string,
    startTime: string,
    endTime: string,
    limit: number,
    nextCursor?: TaskCursorDto
  ): Promise<PaginatedResult<{
    tasks: RepositoryPersonalTaskDto[];
    taskTag: { taskId: string; tagId: string }[];
  }> | null>;

  /**
   * @description 获取上次时间修改的数据  新增任务的会设置修改时间等于创建是时间  删除认为状态为2
   */
  findPersonalTaskUpdate(userId: string, time: Date): Promise<RepositoryPersonalTaskDto[]>;

  createdPersonalTask(userId: string, dto: CreatePersonalTaskDto): Promise<string | null>;
  deletePersonalTask(userId: string, taskIds: string[]): Promise<string[]>;
  //逻辑删除
  updatePersonalTaskStatus(userId: string, taskIds: string[], targetStatus: RowStatusEnum, relatedTargetStatus: RowStatusEnum): Promise<string[]>;
  updatePersonalTask(userId: string, dto: UpdatePersonalTaskDto): Promise<string | null>;
  findTopPersonalTasksByUserId(userId: string, nextCursor: TaskCursorDto, limit: number): Promise<PaginatedResult<RepositoryPersonalTaskDto> | null>;

  findPersonalTaskForTomorrow(userId: string, nextCursor: TaskCursorDto, limit: number): Promise<PaginatedResult<RepositoryPersonalTaskDto> | null>;
  //查询任务所在层级
  findPersonalTasksLevelByUserId(userId: string, taskId: string[]): Promise<RepositoryPersonalTaskDto[]>;
  //id批量查询 获取的是简单的任务数据  项目中没设计完全满足表的dto所有这里使用的any
}
