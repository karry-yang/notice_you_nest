import { CreatePublicTaskDto } from '@task/dto/publicTask/createPublicTask.dto';
import { UpdatePublicTaskDto } from '@task/dto/publicTask/updatePublicTask.dto';
import { PublicTask } from '@task/entities/public-task.entity';
import { PaginatedResult } from 'src/common/types/paginatedResult.interface';

export interface IPublictaskRepository {
  /***
   * /
  /**
   * @description    客户端查询接口  查询单个公开任务 包含详情
   * @param id 公开任务id
   */
  findPublicTaskDetailById(id: string): Promise<PublicTask | null>; //通过id查询任务  获取的是单条数据
  /**
   * @description 任务管理员(组织leder  负责人 创建人)查看单调公开任务详情  携带所有最新用户打卡详情的分页
   * @param id  公开任务id
   */
  // findPublicTaskDetailByIdForRector(id: string, time: Date, nextCursor: { checkin_time: string | null; assingee_id: string | null } | nu): Promise<PaginatedResult<any>>; //通过id查询任务  获取的是单条数据
  /**
   * @description 组织管理员查看单条公开任务详情  携带所有最新用户打卡详情的分页
   * @param id 公开任务id
   * @param organizationId 组织id
   */
  // findPublicTaskDetailByIdForOrgLeader(id: string, organizationId: string): Promise<PublicTask | null>; //通过id查询任务  获取的是单条数据

  /**
   * @description 管理员通过组织id查询  查询组织下的所有公开任务  分页
   * @param organizationId  组织id
   * @param time  限制时间
   * @param nextCursor  浮标
   * @param limit  限制10  默认
   * @returns  paginatedResult<PublicTask>
   */
  findPublicTasksByOrganizationIdWithPagination(
    organizationId: string,
    time: Date,
    nextCursor: { checkin_time: string | null; assingee_id: string | null } | null,
  ): Promise<PaginatedResult<PublicTask>>;

  /**
   * @description 部门管理通过部门id查询  查询组织下的所有公开任务  分页
   * @param organizationId  限制组织范围
   * @param  departmentId 组织id
   * @param time  限制时间
   * @param nextCursor  浮标
   * @param limit  限制10  默认
   * @returns paginatedResult<PublicTask>
   */
  findPublicTasksByDepartmentIdWithPagination(
    organizationId: string,
    departmentId: string,
    time: Date,
    nextCursor: { checkin_time: string | null; assingee_id: string | null } | null,
  ): Promise<PaginatedResult<PublicTask>>; //通过部门id  查询组织下的部门公开任务  分页

  /**
   * @description   通过用户id:指派人assigneeId查询该用户所有的该接收的公开任务
   * @param assigneeId 接收者 等同于用户id
   *   @param time  限制时间
   * @param nextCursor  浮标
   * @param limit  限制10  默认
   * @returns PaginatedResult<PublicTask>
   */
  findPublicTasksByAssigneeIdWithPagination(
    assigneeId: string,
    time: Date,
    nextCursor: { checkin_time: string | null; assingee_id: string | null } | null,
  ): Promise<PaginatedResult<PublicTask>>;
  /**
   * @description  通过用户id:负责人idcretorId查询负责人负责的所有公开任务  分页
   * @param cretorId 负责人id
   */
  findPublicTasksByRectorIdWithPagination(
    rectorId: string,
    time: Date,
    nextCursor: { checkin_time: string | null; assingee_id: string | null } | null,
  ): Promise<PaginatedResult<PublicTask>>; //通过用户id:负责人idcretorId查询
  /**
   * @description 通过用户id：创建人createBy查询 创建人一定会在负责人中  可以采用在负责人查询结果的筛选
   * @param createdBy 创建者id
   */
  findPublicTasksByCreatedByWithPagination(createdBy: string, time: Date,
    nextCursor: { checkin_time: string | null; assingee_id: string | null } | null,): Promise<PaginatedResult<PublicTask>>;

  /**
   * @description  通过清单id查询任务 listicleId查询
   * @param listicleId 公开任务的清单挂钩的是部门id
   * @param userId  userId的作用是代表接收者id
   * @param currentPage  当前页码
   * @param pageSize 数据条数
   * @returns PaginatedResult
   * 清单等同于部门id但是这了之所以不使用部门id(findPublicTasksByCretorIdWithPagination)是因为findPublicTasksByCretorIdWithPagination是返回的本部门的
   * 是部门管理者获取部门内部数据的  而接收者是可以接收其他部门发送的公开数据的
   */
  findPublicTasksByListicleIdWithPagination(
    listicleId: string,
    userId: string,
    nextCursor: { checkin_time: string | null; assingee_id: string | null } | null,
  ): Promise<PaginatedResult<PublicTask>>;

  /**
   * @description  创建新的公开任务
   */
  createPublicTask(createPublicTask: CreatePublicTaskDto): Promise<PublicTask>; //创建新的公开任务

  /**
   * @description    更新公开任务
   */

  updatePublicTask(updatePublicTask: UpdatePublicTaskDto): Promise<PublicTask>; //更新公开任务
}
