import { InjectRepository } from '@nestjs/typeorm';
import { PublicTask } from '@task/entities/public-task.entity';
import { DataSource, Repository } from 'typeorm';
import { IPublictaskRepository } from './interfaces/public-task.repository.interface';
import { PublicTaskAssignee } from '@task/entities/public-task-assignee.entity';
import { PaginatedResult } from 'src/common/types/paginatedResult.interface';
import { UpdatePublicTaskDto } from '@task/dto/publicTask/updatePublicTask.dto';
import { error } from 'console';
import { CreatePublicTaskDto } from '@task/dto/publicTask/createPublicTask.dto';

export class PublicTaskRepository implements IPublictaskRepository {
  constructor(
    @InjectRepository(PublicTask)
    private readonly publicTaskRepository: Repository<PublicTask>,
    private readonly dataSource: DataSource
  ) {}

  /**
   *
   */
  async findPublicTaskDetailById(id: string): Promise<PublicTask | null> {
    const sql = `
      SELECT * FROM public_task  pt
      WHEWE pt.task_id=?
    `;
    const publicTask = await this.dataSource.query(sql, [id]);
    return publicTask ?? null;
  }

  async findPublicTasksByOrganizationIdWithPagination(
    organizationId: string,
    time: Date,
    nextCursor: { checkin_time: string | null; assingee_id: string | null } | null,
  ): Promise<PaginatedResult<PublicTask>> {
    throw error;
  }

  async findPublicTasksByDepartmentIdWithPagination(
    organizationId: string,
    departmentId: string,
    time: Date,
    nextCursor: { checkin_time: string | null; assingee_id: string | null } | null,
  ): Promise<PaginatedResult<PublicTask>> {
    throw error;
  }

  //
  async findPublicTasksByAssigneeIdWithPagination(
    assigneeId: string,
    time: Date,
    nextCursor: { checkin_time: string | null; assingee_id: string | null } | null,
   
  ): Promise<PaginatedResult<PublicTask>> {
    throw error;
  }

  /**
   *
   */
  async findPublicTasksByRectorIdWithPagination(
    rectorId: string,
    time: Date,
    nextCursor: { checkin_time: string | null; assingee_id: string | null } | null,
   
  ): Promise<PaginatedResult<PublicTask>> {
     throw error;
  }
  async findPublicTasksByCreatedByWithPagination(
    createdBy: string,
    time: Date,
    nextCursor: { checkin_time: string | null; assingee_id: string | null } | null,
   
  ): Promise<PaginatedResult<PublicTask>> {
    throw error;
  }

  /**
   * @description 用户从清单获取公开的任务 首先加载5个顶级任务的基本信息
   */
  async findPublicTasksByListicleIdWithPagination(
    listicleId: string,
    userId: string,
    nextCursor: { checkin_time: string | null; assingee_id: string | null } | null,
   
  ): Promise<PaginatedResult<PublicTask>> {
//     try {
//       const offset = (currentPage - 1) * pageSize;
//       //ps公开任务一定对应着部门id，类型一定是department
//       // 获取最高父亲级别的公开任务  清单id等同于部门id所以可以直接使用listicleid去查询公开任务， task_listicle_type = 'department'是用于区分公开任务接收者的范围
//       //普通用户需要查询的是公开任务对全部门开放/所属部门开发 /已经用户di在接收者中的
//       const sql = `
// (
//   SELECT *
//   FROM public_task pt
//     LEFT JOIN public_task_rector ptc ON pt.task_id = ptc.public_task_id
//     LEFT JOIN sys_user u ON ptc.rector_id = u.user_id
//   WHERE department_id = ?
//     AND task_listicle_type = 'department'
//     AND task_parent_id IS NULL
// )
// UNION ALL
// (
//   SELECT *
//   FROM public_task pt
//     LEFT JOIN public_task_rector ptc ON pt.task_id = ptc.public_task_id
//     LEFT JOIN sys_user u ON ptc.rector_id = u.user_id
//   WHERE task_listicle_type = 'department'
//   AND  department_id=1
//     AND task_parent_id IS NULL
// )
// UNION ALL
// (
//   SELECT pt.*
//    FROM public_task pt
//     LEFT JOIN public_task_rector ptc ON pt.task_id = ptc.public_task_id
//     LEFT JOIN sys_user u ON ptc.rector_id = u.user_id
//   JOIN public_task_assignee pta ON pt.task_id = pta.public_task_id
//   WHERE pta.user_id = ?
//   AND task_listile_type='user'
//     AND pt.task_parent_id IS NULL
// )
// ORDER BY created_at DESC
// LIMIT ?, ?;

//     `;

//       const publicTasks: PublicTask[] = await this.dataSource.query(sql, [listicleId, offset, pageSize]);

//       // 查询总条数
//       const countSql = `
//       SELECT COUNT(*) AS total
//       FROM public_task
//       WHERE organization_id = ?
//         AND task_listicle_type = 'department'
//         AND task_parent_id IS NULL;
//     `;

//       const totalResult = await this.dataSource.query(countSql, [organizationId]);
//       const total = Number(totalResult[0].total || 0);

//       return {
//         data: publicTasks,
//         currentPage,
//         pageSize,
//         totalItems: total,
//         totalPages: Math.ceil(total / pageSize),
//       };
//     } catch (error) {
//       console.error('Failed to fetch top-level department public tasks:', error);
//       throw new Error('数据库查询失败');
//     }
 throw error;
  }

  async createPublicTask(createPublicTask: CreatePublicTaskDto): Promise<PublicTask> {
    // try {
    //   const newTask = this.publicTaskRepository.create(createPublicTask);
    //   return await this.publicTaskRepository.save(newTask);
    // } catch (error) {
    //   console.error('Failed to create public task:', error);
    //   throw new Error(`task module: Failed to create public task:createTask(): ${createPublicTask.taskTitle}`);
    // }
     throw error;
  }
  async updatePublicTask(updatePublicTask: UpdatePublicTaskDto): Promise<PublicTask> {
    try {
      const existingTask = await this.findPublicTaskDetailById(updatePublicTask.taskId);
      if (!existingTask) {
        throw new Error(`Public task with id ${updatePublicTask.taskId} not found`);
      }
      const updatedTask = Object.assign(existingTask, updatePublicTask);
      return await this.publicTaskRepository.save(updatedTask);
    } catch (error) {
      console.error('Failed to update public task:', error);
      throw new Error(`task module: Failed to update public task:updateTask(): ${updatePublicTask.taskId}`);
    }
  }
}
