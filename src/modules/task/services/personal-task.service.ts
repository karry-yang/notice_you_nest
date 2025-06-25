import { Inject, Injectable } from '@nestjs/common';
import { IPersonalTaskService } from './interface/personal-task-server.interface';
import { IPersonalTaskRepositoryToken } from 'src/common/token/tokens';
import { IPersonalTaskRepository } from '@task/repositories/interfaces/personal-task.repository.interface';
import { CreatePersonalTaskDto } from '@task/dto/personalTask/create-personal-task.dto';
import { UpdatePersonalTaskDto } from '@task/dto/personalTask/update-personal-task.dto';
import { PersonalTask } from '@task/entities/personal-task.entity';
import { encodeCursor, PaginatedResult, TaskCursor } from 'src/common/types/paginatedResult.interface';
import { BasePersonalTaskSummaryDto } from '@task/dto/personalTask/personal-task-summary.dto';
import { PersonalTaskFilterDto } from '@task/dto/personalTask/psersonal-task-filter.dto';
import { BasePersonalTaskDto } from '@task/dto/personalTask/base-personal-task.dto';
import { SimpleCheckinRuleDto } from '@task/dto/checkinRule/simple-checkin-rule.dto';
import { RepositoryPersonalTaskDto } from '@task/dto/personalTask/reposotory-personal-task.dto';
import { plainToInstance } from 'class-transformer';
import { TaskTypeEnum } from '@shared/enum/TaskTypeEnum';
import { DetailPersonalTaskDto } from '@task/dto/personalTask/detail-personal-task.dto';
import { buildCheckinRuleDto } from 'src/common/utils/buildCheckRuleDto.util';
import { MongodbService } from '@database/mongodb/mongodb.service';
import { PersonalTaskMongoService } from '@database/mongodb/service/personal-task-mongo.service';
import { error } from 'console';
import { any } from 'async';
import { TaskUpdatedCursorDto } from 'src/common/dto/paginatedResult.dto';
import { PersonalTaskDoc } from '@database/mongodb/schemas/personal-task.schema';
import { create } from 'domain';
import { buildPersonTaskDoc } from 'src/common/utils/buildPersonalTaskDoc.util';
import { RowStatusEnum } from '@shared/enum/RowStatusEnum';
import { TaskStatusEnum } from '@shared/enum/TaskStatusEnum';
import { QueryDetailDto } from '@task/dto/personalTask/queryDetail.dao';
import { RedisServiceForPersonalTask } from '@database/redis/servers/forPersonalTask';
import { r } from '@faker-js/faker/dist/airline-BUL6NtOJ';

@Injectable()
export class PersonalTaskService implements IPersonalTaskService {
  constructor(
    @Inject(IPersonalTaskRepositoryToken)
    private readonly personalRep: IPersonalTaskRepository,
    private readonly mongodbService: PersonalTaskMongoService,
    private readonly redisServiceForPersonalTask: RedisServiceForPersonalTask
  ) {}
  getPersonalTasksRencent(userId: string, limit: number, nextCursor?: TaskUpdatedCursorDto): Promise<PaginatedResult<DetailPersonalTaskDto> | null> {
    throw new Error('Method not implemented.');
  }

  private groupTasksById(rows: any[]): Map<string, DetailPersonalTaskDto> {
    const taskMap = new Map<string, DetailPersonalTaskDto>();

    for (const row of rows) {
      if (!row.taskId) continue;

      const { tagId, ...rest } = row;

      const existing = taskMap.get(row.taskId);

      if (!existing) {
        taskMap.set(row.taskId, {
          ...rest,
          tagIds: typeof tagId === 'string' ? [tagId] : [],
          checkinRule: buildCheckinRuleDto(row) ?? ({} as SimpleCheckinRuleDto),
        });
      } else {
        this.appendTagId(existing, tagId);
      }
    }
    //
    return taskMap;
  }

  private appendTagId(task: DetailPersonalTaskDto, tagId: string | null | undefined): void {
    if (!Array.isArray(task.tagIds)) {
      task.tagIds = [];
    }
    if (typeof tagId === 'string' && !task.tagIds.includes(tagId)) {
      task.tagIds.push(tagId);
    }
  }
  //仅仅是获取个人任务和打卡数据不涉及标签和清单ids
  async getPersonalTaskByTaskId(userId: string, taskId: string): Promise<BasePersonalTaskDto | null> {
    const rawResult: RepositoryPersonalTaskDto | null = await this.personalRep.findPersonalTaskByTaskId(userId, taskId);

    if (!rawResult) return null;

    const checkinRule = buildCheckinRuleDto(rawResult);

    const taskDto = plainToInstance(
      BasePersonalTaskDto,
      {
        ...rawResult,
        checkinRule,
      },
      { excludeExtraneousValues: true }
    );

    return taskDto;
  }

  async getDetailPersonalTaskByTaskId(userId: string, taskId: string): Promise<DetailPersonalTaskDto | null> {
    const rawResults = await this.personalRep.findPersonalTaskWithTagAndListicleByTaskId(userId, taskId);
    if (!rawResults || rawResults.length === 0) return null;

    const base = rawResults[0];

    //@TODO判断是否有文件   加载文件
    const tagIds: string[] = [
      ...new Set(
        rawResults
          .map((r) => r.tagId)
          .flat()
          .filter((tagId): tagId is string => typeof tagId === 'string')
      ),
    ];

    const checkinRuleValue = buildCheckinRuleDto(base) ?? ({} as SimpleCheckinRuleDto);

    const finalResult: DetailPersonalTaskDto = {
      ...base,
      tagIds,
      checkinRule: checkinRuleValue,
    };

    const checkinRule = buildCheckinRuleDto(finalResult);

    const taskDto = plainToInstance(
      DetailPersonalTaskDto,
      {
        ...finalResult,
        checkinRule,
      },
      { excludeExtraneousValues: true }
    );
    //设置热点
    Promise.all([this.redisServiceForPersonalTask.setHotPersonalTasksList(userId, taskDto.taskId), this.redisServiceForPersonalTask.setHotPersonalTaskContent(userId, taskDto.taskId, taskDto)]);
    return taskDto;
  }
  async getPersonalTaskByLicticleId(userId: string, listicleId: string, nextCousor: TaskCursor, limit: number = 10): Promise<PaginatedResult<DetailPersonalTaskDto> | null> {
    const rawResults = await this.personalRep.findPersonalTasksWithTagAndListicleByListicleId(userId, listicleId, limit, nextCousor);

    if (!rawResults || rawResults.data.length === 0) {
      return null;
    }

    const taskMap = this.groupTasksById(rawResults.data);

    return {
      data: Array.from(taskMap.values()),
      nextCursor: rawResults.nextCursor,
      hasNextPage: rawResults.hasNextPage,
    };
  }

  async getPersonalTasksByTagId(userId: string, tagId: string, nextCousor: TaskCursor, limit: number = 10): Promise<PaginatedResult<DetailPersonalTaskDto> | null> {
    const rawResults = await this.personalRep.findPersonalTasksWithTagAndListicleByTagId(userId, tagId, limit, nextCousor);
    if (!rawResults || rawResults.data.length <= 0) {
      // return { data: [], nextCursor: null, hasNextPage: false };
      return null;
    }
    const taskMap = this.groupTasksById(rawResults.data);

    return {
      data: Array.from(taskMap.values()),
      nextCursor: rawResults.nextCursor,
      hasNextPage: rawResults.hasNextPage,
    };
  }

  //按照时间范围获取数据 然后分类分组  repository返回的是分页类型的data  但是data内部是包含task 和tags两个数组  因为是先查询的任务的基本数据和层数  然后使用这些taskids去查询的标签  数据整合在service层整合
  //数据整体返回  前端去做筛选
  async getPersonalTasksByUserIdWithFilter(userId: string, filter: PersonalTaskFilterDto, limit: number = 10): Promise<PaginatedResult<DetailPersonalTaskDto> | null> {
    if (!filter?.startTime || !filter?.endTime) {
      return null;
    }

    const rawResult = await this.personalRep.findPersonTasksByFilter(userId, filter.startTime, filter.endTime, limit, filter.nextCursor);

    if (!rawResult?.data || rawResult.data.length === 0) {
      return null;
    }

    const { tasks, taskTag } = rawResult.data[0] as {
      tasks: RepositoryPersonalTaskDto[];
      taskTag: { taskId: string; tagId: string }[];
    };

    const taskDetail: DetailPersonalTaskDto[] = tasks.map((task) => {
      const tagIds = taskTag.filter((t) => t.taskId === task.taskId).map((t) => t.tagId);

      return {
        ...task,
        tagIds,
        checkinRule: buildCheckinRuleDto(task) ?? ({} as SimpleCheckinRuleDto),
      };
    });

    return {
      data: taskDetail,
      nextCursor: rawResult.nextCursor ?? null,
      hasNextPage: rawResult.hasNextPage ?? false,
    };
  }

  //供前端展示
  async getUpdatePersonalTasksRencent(userId: string, limit: number = 10, nextCursor?: TaskUpdatedCursorDto): Promise<PaginatedResult<DetailPersonalTaskDto> | null> {
    //获取的是最近一周修改的数据  数据创建的时候会将创建时间和修改时间统一成一样的

    //定义一个filter
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);

    const filter: PersonalTaskFilterDto = {
      startTime: oneWeekAgo.toISOString(),
      endTime: now.toISOString(),
    } as PersonalTaskFilterDto;

    const rawResults = await this.personalRep.findPersonlTasksByUserIdFiltedByRencent(userId, filter, limit, nextCursor);
    if (!rawResults?.data) return null;
    const taskMap = this.groupTasksById(rawResults.data);

    return {
      data: Array.from(taskMap.values()),
      nextCursor: rawResults.nextCursor,
      hasNextPage: rawResults.hasNextPage,
    };
  }
  //获取明天需要打卡的任务
  async getPersonalTasksForTomorrow(userId: string, nextCursor: TaskCursor, limit: number): Promise<PaginatedResult<DetailPersonalTaskDto> | null> {
    const rawResults = await this.personalRep.findPersonalTaskForTomorrow(userId, nextCursor, limit);
    //整合数据

    if (!rawResults || rawResults.data.length <= 0) {
      // return { data: [], nextCursor: null, hasNextPage: false };
      return null;
    }
    const taskMap = this.groupTasksById(rawResults.data);

    return {
      data: Array.from(taskMap.values()),
      nextCursor: rawResults.nextCursor,
      hasNextPage: rawResults.hasNextPage,
    };
  }
  //创建任务
  async createPersonal(userId: string, createPersonalTask: CreatePersonalTaskDto): Promise<DetailPersonalTaskDto | null> {
    const rawResult = await this.personalRep.createdPersonalTask(userId, createPersonalTask);
    if (rawResult) {
      const createResult = await this.getDetailPersonalTaskByTaskId(userId, rawResult);
      //创建成功
      if (createResult) {
        try {
          // 使用allSettled来确保所有操作都执行完毕
          const results = await Promise.allSettled([
            this.redisServiceForPersonalTask.setHotPersonalTasksList(userId, createResult.taskId),
            this.redisServiceForPersonalTask.setHotPersonalTaskContent(userId, createResult.taskId, createResult),
            this.redisServiceForPersonalTask.setCreatedPersonalTasksList(userId, createResult.taskId),
          ]);

          // 检查是否有失败的缓存操作
          const failedOperations = results.filter((result) => result.status === 'rejected');
          if (failedOperations.length > 0) {
            console.warn(
              '部分缓存更新失败:',
              failedOperations.map((op) => op.reason)
            );
            // 可以在这里添加额外的错误处理逻辑
          }

          return createResult;
        } catch (err) {
          console.error('意外的缓存更新错误', err);
          return createResult; // 仍然返回创建结果
        }
      }
    }
    //创建失败
    return null;
  }

  // @TODO  还需考虑修改后的层级等等  要做出缓存清除或者其他方案
  async updatePersonal(userId: string, updatePersonalTaskDto: UpdatePersonalTaskDto): Promise<DetailPersonalTaskDto | null> {
    //需要查询该任务父级的所有子任务用于检测和修改所有层级问题  前提时获取原来的数据库数据用于比较父级任务是不是改变
   let rawParentWithChildrens: DetailPersonalTaskDto[] = [];
   //前端传入层级数 表示层数已经改变
    if (updatePersonalTaskDto?.taskParentId && updatePersonalTaskDto?.level) {
     const rawParentWithChildrensAndPagination = await this.personalRep.finPersonalTasksWithChildrensByTaskId(userId, updatePersonalTaskDto.taskParentId, updatePersonalTaskDto.level, 1000);
     if(rawParentWithChildrensAndPagination?.data) {
       const taskMap = this.groupTasksById(rawParentWithChildrensAndPagination.data);
        rawParentWithChildrens = Array.from(taskMap.values());
     }
    }
    //
    const time = new Date();
    let id: string | null = null;

    //  第一次写内容，需要先写 Mongo，然后写 MySQL
    if (!updatePersonalTaskDto.taskObjectId && Array.isArray(updatePersonalTaskDto.content) && updatePersonalTaskDto.content.length > 0) {
      const mongoDoc = buildPersonTaskDoc(updatePersonalTaskDto, userId, time);
      const result = await this.mongodbService.insert(mongoDoc);
      const mongoId = result.insertedId;

      updatePersonalTaskDto.taskObjectId = mongoId.toHexString();

      id = (await this.personalRep.updatePersonalTask(userId, updatePersonalTaskDto)) ?? null;
    }

    //  已经有 taskObjectId 的，说明之前写过内容，可并发更新
    else if (updatePersonalTaskDto.taskObjectId && updatePersonalTaskDto.content) {
      await Promise.all([this.mongodbService.updateByTaskId(updatePersonalTaskDto.taskId, updatePersonalTaskDto.content), this.personalRep.updatePersonalTask(userId, updatePersonalTaskDto)]);

      id = updatePersonalTaskDto.taskId;
    }

    //  返回详情
    if (id) {
      const updateResult = await this.getDetailPersonalTaskByTaskId(userId, id);
      //如果任务的父级id改变,或者父级id改变伴随着层级数改变了 updateResult.length>0
      if (updateResult?.level !== undefined && updateResult.taskParentId !== undefined && rawParentWithChildrens[0].level ) {
        if (rawParentWithChildrens.length > 0 && updateResult.taskParentId !== rawParentWithChildrens[0].taskParentId) {
          //如果父级id改变了或者任务的层级也改变了
          //直接清除缓存
          await this.redisServiceForPersonalTask.setPersonalTaskLevelListBatch(userId, rawParentWithChildrens[0].level, updateResult.taskParentId, [updateResult]);
        }
        try {
          await Promise.all([
            this.redisServiceForPersonalTask.setHotPersonalTasksList(userId, updateResult.taskId),
            this.redisServiceForPersonalTask.setHotPersonalTaskContent(userId, updateResult.taskId, updateResult),
            this.redisServiceForPersonalTask.setUpdatedPersonalTasksList(userId, updateResult.taskId),
          ]);
          return updateResult;
        } catch (err) {
          console.error('缓存更新失败', err);

          return null; // 或 return updateResult;
        }
      }

      return null;
    }
    return null;
  }

  //删除任务   就是修改  执行 的逻辑删除
  async deletePersonalTask(userId: string, taskId: string[]): Promise<string[] | boolean> {
    // repository层
    //修改任务状态INACTIVE = 0,  ACTIVE = 1,DELECT=2
    //级联操作删除打卡规则  打卡
    // 删除任务内容
    //删除打卡日志灯
    //删除任务的标签关联
    const data = await this.personalRep.logicDeletePersonalTask(userId, taskId);
    //将每次删除的数据保存再redis中
    await this.redisServiceForPersonalTask.addDeletedTask(userId, data);
    return data;
  }
  async getChildrenPersonTasksByParentId(userId: string, parentId: string, parentLeavel: number, limit: number, nextCursor: TaskCursor): Promise<PaginatedResult<DetailPersonalTaskDto> | null> {
    const rawResults = await this.personalRep.finPersonalTasksWithChildrensByTaskId(userId, parentId, parentLeavel, limit, nextCursor);

    //整合tagids和
    if (!rawResults || rawResults.data.length <= 0) {
      // return { data: [], nextCursor: null, hasNextPage: false };
      return null;
    }
    const taskMap = this.groupTasksById(rawResults.data);

    return {
      data: Array.from(taskMap.values()),
      nextCursor: rawResults.nextCursor,
      hasNextPage: rawResults.hasNextPage,
    };
  }
  //设置热点  仅仅需要添加mark缓存
  async getPersonalTaskContent(userId: string, dto: QueryDetailDto): Promise<Record<string, any>> {
    const { taskId, taskObjectId } = dto;
    if (!taskObjectId) {
      return {
        content: null, // Slate 节点数组
      };
    }
    const doc = await this.mongodbService.findByTaskId(taskObjectId);
    if (!doc) {
      throw new Error('Task not found');
    }

    if (doc.userId !== userId || doc.taskId != taskId) {
      throw new Error('Permission denied');
    }

    return {
      taskId: doc.taskId,
      content: doc.content, // Slate 节点数组
      updatedAt: doc.updatedAt,
    };
  }
  async getTopPersonalTasks(userId: string, nextCousor: TaskCursor, limit: number = 10): Promise<PaginatedResult<DetailPersonalTaskDto> | null> {
    //有缓存的情况下 直接获取缓存
    let startTime: number;
    let chache: any;
    if (nextCousor?.createdAt) {
      startTime = Math.floor(new Date(nextCousor.createdAt).getTime());
      chache = await this.redisServiceForPersonalTask.getPersonalTaskTree(userId, null, 0, startTime);
      if (chache.length > 0) {
        //如果有缓存数据 直接返回
        if (chache.length > limit) {
          const data = chache.slice(0, limit);
          nextCousor = {
            createdAt: data[data.length - 1].createdAt,
            taskId: data[data.length - 1].taskId,
          };
          return {
            data: data,
            nextCursor: encodeCursor(nextCousor, 'taskCursor'),
            hasNextPage: true,
          };
        }
      }
    }

    //没有缓存数据 直接查询数据库
    if (!chache) {
      const rawResults = await this.personalRep.findTopPersonalTasksByUserId(userId, nextCousor, limit);
      //整合数据
      if (!rawResults || rawResults.data.length <= 0) {
        return null;
      }
      const taskMap = this.groupTasksById(rawResults.data);
      const data = Array.from(taskMap.values());
      //缓存{taskid ,created:number}

      await this.redisServiceForPersonalTask.setPersonalTaskLevelListBatch(userId, 0, null, data);

      return {
        data: data,
        nextCursor: rawResults.nextCursor,
        hasNextPage: rawResults.hasNextPage,
      };
    }
    return null;
  }
}
