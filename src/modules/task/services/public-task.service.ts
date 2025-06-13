import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPublicTaskService } from './interface/public-task-server.interface';
import { CreatePublicTaskDto } from '@task/dto/publicTask/createPublicTask.dto';
import { UpdatePublicTaskDto } from '@task/dto/publicTask/updatePublicTask.dto';
import { PublicTask } from '@task/entities/public-task.entity';
import { PaginatedResult } from 'src/common/types/paginatedResult.interface';
import { IPublicTaskRepositoryToken } from 'src/common/token/tokens';
import { IPublictaskRepository } from '@task/repositories/interfaces/public-task.repository.interface';
import { MongodbService } from '@database/mongodb/mongodb.service';
import { ObjectId } from 'typeorm';


//发布公开任务
//查询发布者所有公开任务
//查询发布的公开任务接收情况
//查询用户接收的公开任务
//按照部门清单进行个人接收公开任务分类查询
//获取个人接收公开任务的单个清单数据
//获取公开任务详情
//获取公开任务个人打卡信息
//获取公开任务所有打卡信息
@Injectable()
export class PublicTaskService implements IPublicTaskService {
  constructor(
    @Inject(IPublicTaskRepositoryToken)
    private readonly publicTaskRep: IPublictaskRepository,
    private readonly mogodbService: MongodbService
  ) {}
  getByUserId(userId: string, nextCursor: string): Promise<PaginatedResult<PublicTask>> {
    throw new Error('Method not implemented.');
  }
  getByCreateBy(createBy: string, nextCursor: string): Promise<PaginatedResult<PublicTask>> {
    throw new Error('Method not implemented.');
  }
  getByListcleId(listcleId: string, userId: string, nextCursor:{ checkin_time: string | null; assingee_id: string | null } | null): Promise<PaginatedResult<PublicTask>> {

    const data = this.publicTaskRep.findPublicTasksByListicleIdWithPagination(listcleId,userId,nextCursor)
    throw new Error('Method not implemented.');
  }
  creatPublicTask(publicTask: CreatePublicTaskDto): Promise<PublicTask> {
    throw new Error('Method not implemented.');
  }
  updatePublicTask(updatePublicTaskDto: UpdatePublicTaskDto): Promise<PublicTask> {
    throw new Error('Method not implemented.');
  }
  getAllPublicTasksByOrganizationId(organizationId: string, cursor?: string | null, hasNextPage?: boolean): Promise<PaginatedResult<PublicTask>> {
    throw new Error('Method not implemented.');
  }
  getAllPublicTasksByDepartmentId(organizationId: string, cursor?: string | null, hasNextPage?: boolean): Promise<PaginatedResult<PublicTask>> {
    throw new Error('Method not implemented.');
  }
  getPublicTaskDetailFortaskCretor(taskId: string, userId: string): Promise<PublicTask> {
    throw new Error('Method not implemented.');
  }
  getAllPublicTasksByListicleId(listicleId: string, cursor?: string | null, hasNextPage?: boolean): Promise<PaginatedResult<PublicTask>> {
    throw new Error('Method not implemented.');
  }
  getPublicTaskDetailForAssignee(taskId: string, userId: string): Promise<PublicTask> {
    throw new Error('Method not implemented.');
  }

 async getById(id: string): Promise<any > {


  //获取任务的基础信息和mark文档
     const [publicTask, markDown] = await Promise.all([
    this.publicTaskRep.findPublicTaskDetailById(id),
    this.mogodbService.findOne('publicTask', { _id: new ObjectId(id) }),
  ]);

  if (!publicTask) {
    throw new NotFoundException('任务不存在');
  }

  return {
    ...publicTask, // MySQL 返回的字段
    markDownContent: markDown?.content ?? null, // MongoDB 中的 Markdown 内容
  };
  }
 
}
