import { CreatePersonalTaskDto } from '@task/dto/personalTask/create-personal-task.dto';
import { PersonalTaskSummaryDto } from '@task/dto/personalTask/personal-task-summary.dto';
import { BasePersonalTaskDto } from '@task/dto/personalTask/base-personal-task.dto';
import { PersonalTaskWithBaseListicleAndBaseTagDto } from '@task/dto/personalTask/personalTasksWithBaseListicleAndBaseTag.dto';
import { PersonalTaskFilter } from '@task/dto/personalTask/psersonal-task-filter.dto';
import { UpdatePersonalTaskDto } from '@task/dto/personalTask/update-personal-task.dto';
import { PersonalTask } from '@task/entities/personal-task.entity';
import { PaginatedResult, TaskCursor } from 'src/common/types/paginatedResult.interface';
import { DetailPersonalTaskDto } from '@task/dto/personalTask/detail-personal-task.dto';
import { TaskUpdatedCursorDto } from 'src/common/dto/paginatedResult.dto';
import { QueryDetailDto } from '@task/dto/personalTask/queryDetail.dao';

export interface IPersonalTaskService {
  /**
   * @description     查看单个个人任务 携带打卡规则
   * @param taskId  personalTaskId
   *
   */
  getPersonalTaskByTaskId(userId: string, taskId: string): Promise<BasePersonalTaskDto | null>;
  /**
   * @description     获取任务详情  包括清单信息 和标签信息
   * @param taskId  personalTaskId
   *@returns findPersonalTaskByIdWithListicleAndTag {@link findPersonalTaskByIdWithListicleAndTag}
   */
  getDetailPersonalTaskByTaskId(userId: string, taskId: string): Promise<DetailPersonalTaskDto | null>;

  /**
   * @description 通过清单id获取任务
   * @param userId 限制personaTaskId=userid
   * @param listicleId 限制限制personaTask.taskListicle_id=listicle.listicleId=listicleId
   * @param limit 数量限制  10条顶级数据
   * @returns PaginatedResult {@link paginatedResult}
   */
  getPersonalTaskByLicticleId(userId: string, listicleId: string, nextCousor: TaskCursor, limit: number): Promise<PaginatedResult<DetailPersonalTaskDto> | null>;
  /**
   * @description  通过标签id获取任务
   *  @param userId 限制personaTaskId=userid
   * @param tagId 限制限制personaTask.tagId=tag.tagId =tagId
   * @param limit 数量限制  10条顶级数据
   * @returns PaginatedResult {@link paginatedResult}
   */
  getPersonalTasksByTagId(userId: string, tagId: string, nextCousor: TaskCursor, limit: number): Promise<PaginatedResult<DetailPersonalTaskDto> | null>;

  /**
   * @description 获取满足条件的所有任务摘要模式
   * @param userId 限制personaTaskId=userid
   * @param filter {@link PersonalTaskFilter}
   * @returns Promise<PaginatedResult<PersonalTaskSummaryDto>>
   */
  getPersonalTasksByUserIdWithFilter(userId: string, filter: PersonalTaskFilter): Promise<PaginatedResult<DetailPersonalTaskDto> | null>;
  /**
   * @description  创建  同时关联标签和清单
   *
   * @param  createPersonalTask {@link CreatePersonalTaskDto}
   */
  createPersonal(userId: string, createPersonalTask: CreatePersonalTaskDto): Promise<DetailPersonalTaskDto | null>;
  /**
   * @description 修改
   * @param updatePersonalTaskDto  {@link UpdatePersonalTaskDto}
   
   */
  updatePersonal(userId: string, updatePersonalTaskDto: UpdatePersonalTaskDto): Promise<DetailPersonalTaskDto | null>;
  /**
   * @description 删除
   * @param taskId
   */
  deletePersonalTask(userId: string, taskId: string[]): Promise<string[] | boolean>;
  /**
   * @description 获取个人任务携带所有下级个人任务
   * @param userId 限制personaTaskId=userid
   * @param parentId  限制personaTask.parentId=parentId
   */
  getChildrenPersonTasksByParentId(userId: string, parentId: string, parentLeavel: number, limit: number, nextCursor?: TaskCursor): Promise<PaginatedResult<DetailPersonalTaskDto> | null>;

  //获取 最近七天的更新数据
  getPersonalTasksRencent(userId: string, limit: number, nextCursor?: TaskUpdatedCursorDto | null): Promise<PaginatedResult<DetailPersonalTaskDto> | null>;
  //获取任务内容
  getPersonalTaskContent( userId: string,dto:QueryDetailDto): Promise<Record<string, any> >;

  //分页获取顶级任务
  getTopPersonalTasks(userId: string, nextCousor: TaskCursor | null, limit: number): Promise<PaginatedResult<DetailPersonalTaskDto> | null>;
  //获取最近修改的数据
  getUpdatePersonalTasksRencent(userId: string, limit: number, nextCursor?: TaskUpdatedCursorDto): Promise<PaginatedResult<DetailPersonalTaskDto> | null>;
  //获取明天需要打卡的任务
  getPersonalTasksForTomorrow(userId: string, nextCursor: TaskCursor| null, limit: number): Promise<PaginatedResult<DetailPersonalTaskDto> | null>
}
