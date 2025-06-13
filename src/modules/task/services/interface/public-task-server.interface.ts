import { CreatePublicTaskDto } from '@task/dto/publicTask/createPublicTask.dto';
import { UpdatePublicTaskDto } from '@task/dto/publicTask/updatePublicTask.dto';
import { PublicTask } from '@task/entities/public-task.entity';
import { PaginatedResult } from 'src/common/types/paginatedResult.interface';

export interface IPublicTaskService {
  /**
   * @description  通过id获取公开任务的数据  获取的是公开任务的详情  用户类型是客户端接收者
   */
  getById(id: string): Promise<any>;

  //============客户端========

  /**
 * @description   接受者用户查询所有接收的公开任务  通过listicleId分类
@param   userId: 接收者用户id,
@param  currentPage: 当前页码,
@param  pageSize: 每页数量
*/
  getByUserId(userId: string, nextCursor: string,): Promise<PaginatedResult<PublicTask>>;

  //发布者查询所有发布的公开任务
  //  接收参数- createBy: 发布者用户id, currentPage: 当前页码, pageSize: 每页数量
  getByCreateBy(createBy: string, nextCursor: string,): Promise<PaginatedResult<PublicTask>>;

  /**
 * @description   通过清单获取该清单的所有任务  分页  
   @param {string} listcleId  清单id
   @param {string} userId  接收者用户id
   @param {number} currentPage : 当前页码
   @param {number} pageSize: 每页数量
*/
  getByListcleId(listcleId: string, userId: string, nextCursor:{ checkin_time: string | null; assingee_id: string | null } | null): Promise<PaginatedResult<PublicTask>>;

  /**
 * @description   创建公开任务
  @param publicTask: CreatePublicTaskDto  同时关联组织部门清单
  @returns PublicTask
*/
  creatPublicTask(publicTask: CreatePublicTaskDto): Promise<PublicTask>;

  /**
   * @description   //修改公开任务
 @param   UpdatePublicTaskDto
 @returns PublicTask
  */
  updatePublicTask(updatePublicTaskDto: UpdatePublicTaskDto): Promise<PublicTask>;

  //组织管理获取全部的公开任务  ===组织中所有的部门
  //接收参数- organizationId:组织id,currentPage: 当前页码, pageSize: 每页数量
  getAllPublicTasksByOrganizationId(organizationId: string, cursor?: string | null, hasNextPage?: boolean): Promise<PaginatedResult<PublicTask>>;
  //部门管理查看本部门所有的公开任务
  getAllPublicTasksByDepartmentId(organizationId: string, cursor?: string | null, hasNextPage?: boolean): Promise<PaginatedResult<PublicTask>>;

  /**
   * @description  获取任务详情   负责人用户获取的是任务详情和所有人的打卡数据
   * @param  taskId 任务id
   * @param taskCretorId 负责人
   * @return PublicTask
   */
  getPublicTaskDetailFortaskCretor(taskId: string, userId: string): Promise<PublicTask>;

  //普通用户

  //组织管理通过部门id获取公开任务
  //接收参数- listicleId:部门id,currentPage: 当前页码, pageSize: 每页数量
  getAllPublicTasksByListicleId(listicleId: string, cursor?: string | null, hasNextPage?: boolean): Promise<PaginatedResult<PublicTask>>;

  /**
   * @description  获取任务详情   普通用户获取的是任务详情和个人的打卡数据
   * @param  taskId 任务id
   * @param userId 接收者id
   * @return PublicTask
   */
  getPublicTaskDetailForAssignee(taskId: string, userId: string): Promise<PublicTask>;
}
