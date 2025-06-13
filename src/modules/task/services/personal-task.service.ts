import { Inject, Injectable } from '@nestjs/common';
import { IPersonalTaskService } from './interface/personal-task-server.interface';
import { IPersonalTaskRepositoryToken } from 'src/common/token/tokens';
import { IPersonalTaskRepository } from '@task/repositories/interfaces/personal-task.repository.interface';
import { CreatePersonalTaskDto } from '@task/dto/personalTask/create-personal-task.dto';
import { UpdatePersonalTaskDto } from '@task/dto/personalTask/update-personal-task.dto';
import { PersonalTask } from '@task/entities/personal-task.entity';
import { PaginatedResult, TaskCursor } from 'src/common/types/paginatedResult.interface';
import { BasePersonalTaskSummaryDto } from '@task/dto/personalTask/personal-task-summary.dto';
// import { PersonalTaskWithBaseListicleAndBaseTagDto } from '@task/dto/personalTask/personalTasksWithBaseListicleAndBaseTag.dto';
import { PersonalTaskFilter } from '@task/dto/personalTask/psersonal-task-filter.dto';

@Injectable()
export class PersonalTaskService implements IPersonalTaskService {
  constructor(
    @Inject(IPersonalTaskRepositoryToken)
    private readonly personalRep: IPersonalTaskRepository
  ) {}
  async getDetailPersonalTaskByUserId(userId: string, limit: number = 10): Promise<PersonalTaskWithBaseListicleAndBaseTagDto[]> {
    const result = await this.personalRep.findPersonalTaskByUserIdWithBaseListicleAndBaseTagPagination(userId, limit);
    return result;
  }
  async getBasePersonalTaskByTaskId(userId: string, taskId: string): Promise<PersonalTask | null> {
    const result = await this.personalRep.findPersonalTaskById(userId, taskId);
   return  result?? null
  }
  async getDetailPersonalTaskByTaskId(userId: string, taskId: string): Promise<PersonalTaskWithBaseListicleAndBaseTagDto | null> {
    const  result = await  this.personalRep.findPersonalTaskByIdWithListicleAndTag(userId,taskId)
    // throw new Error('Method not implemented.')
    return  result?? null
  }
  async getDetailPersonalTaskByLicticleId(userId: string, listicleId: string, nextCousor: TaskCursor | null, limit: number): Promise<PaginatedResult<PersonalTaskWithBaseListicleAndBaseTagDto>| null> {
    // throw new Error('Method not implemented.');
    const  result= await  this.personalRep.findByListicleIdWithPagination(userId,listicleId,nextCousor,limit)
  return   result.data.length>0? result : null
  }
  async getDetailPersonalTaskByTagId(userId: string, tagId: string, nextCousor: TaskCursor, limit: number): Promise<PaginatedResult<PersonalTaskWithBaseListicleAndBaseTagDto> | null> {
      const  result= await  this.personalRep.findPersonalTaskByTagIdWIthPagination(userId,tagId,nextCousor,limit)
  return   result.data.length>0? result : null
  }
  async getPersonalTaskSummaryByUserIdWithFilter(userId: string, filter: PersonalTaskFilter):Promise<PaginatedResult<BasePersonalTaskSummaryDto>> {
    const  result=  await  this.personalRep.findPersonalTaskSummary(userId,filter)
   return  result
  }
  async createPersonal(createPersonalTask: CreatePersonalTaskDto): Promise<PersonalTask | null> {
    throw new Error('Method not implemented.');
  }
  async updatePersonal(updatePersonalTaskDto: UpdatePersonalTaskDto): Promise<PersonalTask | null> {
    throw new Error('Method not implemented.');
  }
  async deletePersonalTask(taskId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async getChildrenDetailPersonTaskByParentId(userId: string, parentId: string): Promise<PersonalTaskWithBaseListicleAndBaseTagDto[]> {
    throw new Error('Method not implemented.');
  }
}
