import { FocusCursor, PaginatedResult } from 'src/common/types/paginatedResult.interface';
import { CreateFocusDto } from '../dto/focus/create-focus.dto';
import { HabitFocus } from '../entities/habit-focus.entity';
import { IFocusService } from './interface/focus-service.interface';
import { BadRequestException, Inject, Injectable, Query } from '@nestjs/common';
import { IFocusRepositoryToken } from 'src/common/token/tokens';
import { IFocusRespository } from '../repositories/interfaces/focus.repository.interface';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { RateDto } from '../dto/common/rate.dto';
import { error } from 'console';
import { EndFocusDto } from '../dto/focus/endFocus.dto';
import { StartFocusDto } from '../dto/focus/startFocus.dto';
// import { RedisService } from '@database/redis/servers/redis.service';
import { RedisServiceForFocus } from '@database/redis/servers/forFocus.service';

@Injectable()
export class FocusService implements IFocusService {
  constructor(
    @Inject(IFocusRepositoryToken)
    private readonly focusRep: IFocusRespository,
    private readonly redisServerForFoucus: RedisServiceForFocus
  ) {}

  async getFocusesByHabitId(habitId: string, nextCursor: FocusCursor | null): Promise<PaginatedResult<HabitFocus>> {
    //
    const data = this.focusRep.findByHabitTaskId(habitId, nextCursor);
    return data;
  }

  //TODO  前端点击开始的时候 数据保存在redis中  当点击结束的时候  从redis中获取数据 再调用数据库操作
  // async createFocus(userId: string, createFocus: CreateFocusDto): Promise<CreateFocusDto> {
  //   throw new Error('Method not implemented.');
  // }
  async deleteFocus(focusId: string): Promise<boolean> {
    const data = await this.focusRep.deleteFocus(focusId);
    if (data) return true;
    return false;
  }

  //获取最近七天的专注率
  async getLastSevenDaysFocusRate(
    @CurrentUser('userId') userId: string,
    @Query('time') time?: string // 假设是 query 参数
  ): Promise<RateDto[]> {
    const baseTime = time ? new Date(time) : new Date();

    if (isNaN(baseTime.getTime())) {
      throw new BadRequestException('Invalid ISO time format');
    }

    const data = await this.focusRep.findHabitsSevenDaiesData(userId, baseTime);
    return data ?? [];
  }

  async startFocus(userId: string, startFocus: StartFocusDto): Promise<boolean> {
    const data = await this.redisServerForFoucus.setStartFocus(userId, startFocus);
    if (data) return true;
    return false;
  }
  async endFocus(userId: string, endFocus: EndFocusDto): Promise<HabitFocus> {
    const focusStartData = await this.redisServerForFoucus.getFocusData(userId, endFocus.habitTaskId);

    if (!focusStartData) {
      throw new Error('未找到开始专注记录，请先启动专注');
    }

    // 合并 Redis 数据和传入的结束数据，生成 CreateFocusDto
    const createFocusDto: CreateFocusDto = {
      habitTaskId: endFocus.habitTaskId,
      habitTaskStartTime: new Date(focusStartData.habitTaskStartTime),
      habitTaskEndTime: endFocus.habitTaskEndTime,
      habitTaskFocusLog: endFocus.habitTaskFocusLog,
    };

    // 写入数据库（你需要实现 createFocus 方法）
    const createdFocus = await this.focusRep.createFocus(createFocusDto, userId);
    if (!createdFocus) {
      throw new Error('专注记录创建失败');
    }
    return createdFocus;
  }
  //获取糖果数量==总有效专注
  //获取habit总专注数

  //删除专注记录

}
