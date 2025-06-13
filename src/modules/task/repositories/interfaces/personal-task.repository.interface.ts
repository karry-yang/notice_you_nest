import { BasePersonalTaskSummaryDto } from '@task/dto/personalTask/personal-task-summary.dto';
import { BasePersonalTasksGroupDto } from '@task/dto/personalTask/base-personal-tasks-group.dto';
import { PersonalTaskFilterDto } from '@task/dto/personalTask/psersonal-task-filter.dto';
import { PersonalTask } from '@task/entities/personal-task.entity';
import { TaskCursorDto, TaskLevelCursorDto, TaskUpdatedCursorDto } from 'src/common/dto/paginatedResult.dto';
import { PaginatedResult } from 'src/common/types/paginatedResult.interface';
import { CreatePersonalTaskDto } from '@task/dto/personalTask/create-personal-task.dto';
import { UpdatePersonalTaskDto } from '@task/dto/personalTask/update-personal-task.dto';

/**
 *标签是多对多的关系关系 

*/
export interface IPersonalTaskRepository {
  /**
   * @description  查询的是个人任务对象+checkinrule
   *  @param userId  限制查询的数据是personalTask.createdAt=userId
   * @param id  personalTask.taskId=id
   * @returns any
   */
  findPersonalTaskByTaskId(userId: string, taskId: string): Promise<any>;

  /**
   * @description  查询的是个人任务对象+rule+tag+licticle
   * @param userId  限制查询的数据是personalTask.createdAt=userId
   * @param taskId  personalTask.taskId=id
   * @returns   any
   */
  findPersonalTaskWithTagAndListicleByTaskId(userId: string, taskId: string): Promise<any>;

  /**
   * @description  查询的是个人任务对象+rule+tag+licticle+children+leaveal   获取的是任务id下的所有子任务数据，平铺展示  每层展示的数据应该不超过十个子任务
   * @param userId  限制查询的数据是personalTask.createdAt=userId
   * @param parentId  personalTask.taskId=parentId
   * @param level 父级任务的等级   用于避免避免重复获取和子任务的等级划分
   * @returns  any
   */
  finPersonalTasksWithChildrensByTaskId(userId: string, parentId: string, level: number, nextCousor?: TaskLevelCursorDto): Promise<any>;
  /**
   * @description  获取过滤器(时间，标签，最新打卡状态)范围内的任务 分页不分层
   *  @param userId  限制查询的数据是personalTask.createdAt=userId
   * @param filter  {@link PersonalTaskFilterDto}  过滤器(orderBy不用，在service层处理)
   * @param  limit 限制数量
   * @param nextCursor--{@link TaskCursorDto}  可选参数 首次加载没有浮标
   * @returns  any
   */
  findPersonlTasksByUserIdFiltedByRencent(userId: string, filter: PersonalTaskFilterDto, limit: number, nextCursor?: TaskUpdatedCursorDto): Promise<any>;

  /**
   * @description  通过tagId获取任务 十个最近的顶级任务  携带一层子任务  平铺  分页分层
   *  @param userId  限制查询的数据是personalTask.createdAt=userId
   * @param tagId  标签id
   * @param  limit 限制数量
   * @param nextCursor--{@link TaskCursorDto}  可选参数 首次加载没有浮标
   * @returns any
   */
  findPersonalTasksWithTagAndListicleByTagId(userId: string, tagId: string, limit: number, nextCursor?: TaskCursorDto): Promise<any>;

  /**
   * @description  通过tlicticleId获取任务 十个最近的顶级任务  携带一层子任务  平铺  分页分层
   *  @param userId  限制查询的数据是personalTask.createdAt=userId
   * @param listicleId  清单id
   * @param  limit 限制数量
   * @param nextCursor--{@link TaskCursorDto}  可选参数 首次加载没有浮标
   * @returns  any
   */
  findPersonalTasksWithTagAndListicleByListicleId(userId: string, listicleId: string, limit: number, nextCursor: TaskCursorDto): Promise<any>;

  /**
   * @description  分页 分层  获取的是每个清单的前十条顶级任务  分页分层  携带子任务  不分组  分组在service进行
   */
  findPersonTasksByFilter(userId: string, limit: number, startTime: Date, endTime: Date, nextCursor?: TaskCursorDto): Promise<any>;

  /**
   * @description 获取上次时间修改的数据  新增任务的会设置修改时间等于创建是时间  删除认为状态为2
   */
  findPersonalTaskUpdate(userId: string, time: Date): Promise<any[]>;



  createdPersonalTask(userId: string, dto: CreatePersonalTaskDto): Promise<any>;
  deletePersonalTask(userId: string, taskId: string): Promise<boolean>;
  updatePersonalTask(userId: string, dto: UpdatePersonalTaskDto): Promise<any>;
}
