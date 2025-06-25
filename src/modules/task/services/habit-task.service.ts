import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IHabitTaskService } from './interface/habit-task-server.interface';
import { IHabitTaskRepository } from '@task/repositories/interfaces/habit-task.repository.interface';
import { IFocusServiceToken, IHabitGroupRepositoryToken, IHabitTaskRepositoryToken } from 'src/common/token/tokens';
import { HabitTask } from '@task/entities/habit-task.entity';
import { FocusCursor, PaginatedResult, TaskCursor } from 'src/common/types/paginatedResult.interface';
import { CreateHabitTaskDto } from '@task/dto/habitTask/createHabitTask.dto';
import { UpdateHabitTaskDto } from '@task/dto/habitTask/updateHabitTask.dto';
import { MongodbService } from '@database/mongodb/mongodb.service';
import { ObjectId } from 'typeorm';
import { HabitTaskWithDetail } from '@task/dto/habitTask/habitWithDetail.dto';
import { IFocusService } from 'src/modules/checkIn/services/interface/focus-service.interface';
import { RateDto } from 'src/modules/checkIn/dto/common/rate.dto';
import { generateSnowflakeId } from '@shared/lib/snowflake';
import { IHabitGroupRepository } from '@task/repositories/interfaces/habit-group.repository';
import { HabitGroup } from '@task/entities/habit-group.entity';
@Injectable()
export class HabitTaskService implements IHabitTaskService {
  constructor(
    @Inject(IHabitTaskRepositoryToken)
    private readonly habitRep: IHabitTaskRepository,
    @Inject(IHabitGroupRepositoryToken)
    private readonly habitGroupRep: IHabitGroupRepository,
    private readonly mongodbServie: MongodbService,
    @Inject(IFocusServiceToken)
    private readonly focusService: IFocusService
  ) {}

  async createHabit(createHabit: CreateHabitTaskDto, userId: string): Promise<HabitTask | null> {
    //@TODO  还需要同步绑定分组  没有这个分组的时候需要创建一个新的分组
    //查询分组
    if (createHabit.habitTaskGroupId) {
      const group = await this.habitGroupRep.findById(createHabit.habitTaskGroupId);
      if (!group) throw new NotFoundException('分组不存在');
      // groupId = group.habit_group_id;
    } else if (createHabit.habitTaskGroupName) {
      // 创建新分组
      const groupId = generateSnowflakeId(); // 你的 ID 生成器
      await this.habitGroupRep.createHabitGroup(groupId, createHabit.habitTaskGroupName, userId);
    } else {
      throw new BadRequestException('必须提供 habitTaskGroupId 或 habitTaskGroupName');
    }
    const habitTaskId = generateSnowflakeId();
    const data = this.habitRep.createHabitTask(createHabit, habitTaskId);
    return data;
  }

  async updateHabit(updateHabit: UpdateHabitTaskDto, userId: string): Promise<HabitTask | null> {
    // @todo  需要验证存在
    //存在还需验证用户id是不是创建者
    const rowHabit = await this.habitRep.findHabitDetailByTaskId(updateHabit.habitTaskId);
    if (!rowHabit) {
      throw new NotFoundException('习惯任务不存在');
    }
    if (rowHabit.createdBy !== userId) {
      throw new ForbiddenException('无权限操作该习惯任务');
    }
    const data = await this.habitRep.updateHabitTask(updateHabit);
    return data || null;
  }

  //用户查询个人所有的习惯数据
  async getHabitsByUserId(userId: string, nextCursor: TaskCursor | null): Promise<PaginatedResult<HabitTask>> {
    const data = await this.habitRep.findByUserId(userId, nextCursor);
    return data;
  }
  async getHabitsByGroupId(groupId: string, nextCursor: TaskCursor | null): Promise<PaginatedResult<HabitTask>> {
    const data = await this.habitRep.findByUserId(groupId, nextCursor);
    return data;
  }

  async getHabitDetailByHabitId(habitId: string, foucsCursor: FocusCursor): Promise<HabitTaskWithDetail | null> {
    const [habit, markDown, logs] = await Promise.all([
      this.habitRep.findHabitDetailByTaskId(habitId),
      this.mongodbServie.findOne('habitTask', { _id: new ObjectId(habitId) }),
      this.focusService.getFocusesByHabitId(habitId, foucsCursor),
    ]);

    //判断是不是存在该habit
    if (!habit) {
      throw new NotFoundException('习惯任务不存在');
    }
    return {
      habitId: habit.habitTaskId,
      markDown: markDown ? JSON.stringify(markDown) : null,
      focus: logs.data,
    };
  }

  async getLastSevenDaiesData(userId: string, date: Date): Promise<RateDto[]> {
    const data = await this.habitRep.findHabitsSevenDaiesData(userId, date);
    return data;
  }

  async getIsLastHabits(userId: string, cursorObj: TaskCursor | null, timestamp: Date): Promise<PaginatedResult<HabitTask>> {
    const data = await this.habitRep.findIsLastHabits(userId, cursorObj, timestamp);
    return data;
  }
  async getAllHabitGroupsByUserId(userId: string): Promise<HabitGroup[]> {
    return await this.habitGroupRep.fidnByUserId(userId);
  }
}
