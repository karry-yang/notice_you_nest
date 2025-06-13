import { CreatePersonalTaskDto } from '@task/dto/personalTask/create-personal-task.dto';
import { PersonalTaskSummaryDto } from '@task/dto/personalTask/personal-task-summary.dto';
import { PersonalTaskWithBaseListicleAndBaseTagDto } from '@task/dto/personalTask/personalTasksWithBaseListicleAndBaseTag.dto';
import { PersonalTaskFilter } from '@task/dto/personalTask/psersonal-task-filter.dto';
import { UpdatePersonalTaskDto } from '@task/dto/personalTask/update-personal-task.dto';
import { PersonalTask } from '@task/entities/personal-task.entity';
import { PaginatedResult, TaskCursor } from 'src/common/types/paginatedResult.interface';

export interface IPersonalTaskService {
  /**
   * @description   查看用户可见个人任务-分页  默认使用listicleid分页 每个分组获取十条顶级数据
   * @param userId  用户id
   * @param nextCousor  分页浮标
   *@returns PersonalTaskWithBaseListicleAndBaseTagDto {@link PersonalTaskWithBaseListicleAndBaseTagDto}
   */
  // getDetailPersonalTaskByUserId(userId: string,limit:number): Promise<PersonalTaskWithBaseListicleAndBaseTagDto[]>;

  /**
   * @description     查看单个个人任务详情
   * @param taskId  personalTaskId
   *
   */
  getBasePersonalTaskByTaskId(userId: string, taskId: string): Promise<PersonalTask | null>;
  /**
   * @description     获取任务详情  包括清单信息 和标签信息
   * @param taskId  personalTaskId
   *@returns findPersonalTaskByIdWithListicleAndTag {@link findPersonalTaskByIdWithListicleAndTag}
   */
  getDetailPersonalTaskByTaskId(userId: string, taskId: string): Promise<PersonalTaskWithBaseListicleAndBaseTagDto | null>;

  /**
   * @description 通过清单id获取任务
   * @param userId 限制personaTaskId=userid
   * @param listicleId 限制限制personaTask.taskListicle_id=listicle.listicleId=listicleId
   * @param limit 数量限制  10条顶级数据
   * @returns PaginatedResult {@link paginatedResult}
   */
  getDetailPersonalTaskByLicticleId(userId: string, listicleId: string, nextCousor: TaskCursor, limit: number): Promise<PaginatedResult<PersonalTaskWithBaseListicleAndBaseTagDto> | null>;
  /**
   * @description  通过标签id获取任务
   *  @param userId 限制personaTaskId=userid
   * @param tagId 限制限制personaTask.tagId=tag.tagId =tagId
   * @param limit 数量限制  10条顶级数据
   * @returns PaginatedResult {@link paginatedResult}
   */
  getDetailPersonalTaskByTagId(userId: string, tagId: string, nextCousor: TaskCursor, limit: number): Promise<PaginatedResult<PersonalTaskWithBaseListicleAndBaseTagDto> | null>;

  /**
   * @description 获取满足条件的所有任务摘要模式
   * @param userId 限制personaTaskId=userid
   * @param filter {@link PersonalTaskFilter}
   * @returns Promise<PaginatedResult<PersonalTaskSummaryDto>>
   */
  getPersonalTaskSummaryByUserIdWithFilter(userId: string, filter: PersonalTaskFilter): Promise<PaginatedResult<PersonalTaskSummaryDto>>;
  /**
   * @description  创建  同时关联标签和清单
   *
   * @param  createPersonalTask {@link CreatePersonalTaskDto}
   */
  createPersonal(createPersonalTask: CreatePersonalTaskDto): Promise<PersonalTask | null>;
  /**
   * @description 修改
   * @param updatePersonalTaskDto  {@link UpdatePersonalTaskDto}
   
   */
  updatePersonal(updatePersonalTaskDto: UpdatePersonalTaskDto): Promise<PersonalTask | null>;
  /**
   * @description 删除
   * @param taskId
   */
  deletePersonalTask(taskId: string): Promise<boolean>;
  /**
   * @description 获取个人任务携带所有下级个人任务
   * @param userId 限制personaTaskId=userid
   * @param parentId  限制personaTask.parentId=parentId
  */
  getChildrenDetailPersonTaskByParentId(userId: string, parentId: string): Promise<PersonalTaskWithBaseListicleAndBaseTagDto[]>;
}
