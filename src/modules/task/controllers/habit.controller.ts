import { MongodbService } from '@database/mongodb/mongodb.service';
import { da } from '@faker-js/faker/.';
import { Controller, Get, Inject, Query, UseGuards, BadRequestException, Param, Post, Body, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateHabitTaskDto } from '@task/dto/habitTask/createHabitTask.dto';
import { UpdateHabitTaskDto } from '@task/dto/habitTask/updateHabitTask.dto';
import { HabitGroup } from '@task/entities/habit-group.entity';
import { HabitTask } from '@task/entities/habit-task.entity';
import { IHabitTaskService } from '@task/services/interface/habit-task-server.interface';
import { error } from 'console';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { MyApiResponse } from 'src/common/dto/api-response.dto';
import { TimestampDto } from 'src/common/dto/timestamp.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { IHabitTaskServiceToken } from 'src/common/token/tokens';
import { decodeCursor, FocusCursor, PaginatedResult, TaskCursor } from 'src/common/types/paginatedResult.interface';
import { verifyCursor } from 'src/common/utils/cursor.utils';
import { RateDto } from 'src/modules/checkIn/dto/common/rate.dto';


/**
 * @description  habit请求控制层
 * @function  getHabitsByUserId  通过用户id获取用户habtis  --分页
 * @function  getHabitsByGroupId  通过分组获取用户habtis  --分页
 * @function  getHabitDetailByHabitId  获取单个habits的详情信息
 * @function  getLastSevenDaiesData  获取日期前七天的打卡数据
 * @function  createHabitTask 创建
 * @function  updateHabitTask  更新
*/
@ApiTags('habits请求服务')
@Controller('/habit')
export class HabitController {
  constructor(
    @Inject(IHabitTaskServiceToken)
    private readonly habitService: IHabitTaskService,
 
  ) {}
  //通过用户id获取分页的习惯任务
  @Get('')
  @UseGuards(JwtAuthGuard) //需要登录
  async getHabitsByUserId(@CurrentUser('userId') userId: string, @Query() nextCursor: string): Promise<MyApiResponse<PaginatedResult<any>>> {
    //获取用户id
    //获取游标
    let cursorObj: TaskCursor | null = null;
    if (nextCursor && nextCursor !== null) {
      try {
        cursorObj = JSON.parse(Buffer.from(nextCursor, 'base64').toString('utf-8'));
      } catch (e) {
        console.error('Error parsing cursor:', e);
        throw new BadRequestException('Invalid cursor');
      }
    }
    const data = await this.habitService.getHabitsByUserId(userId, cursorObj);
    return MyApiResponse.success(data, '查询成功', 200);
  }

  //通过habitGroup获取habits -分页

  @Get('group/:habitGroupId')
  async getHabitsByGroupId(@Param() habitGroupId: string, @Query('nextCursor') nextCursor: string): Promise<PaginatedResult<HabitTask>> {
    //首先检查是否存在游标
    let cursor: TaskCursor | null = null;
    if (!nextCursor) {
      return this.habitService.getHabitsByGroupId(habitGroupId, null);
    }
    //解码
    try {
      cursor = decodeCursor<TaskCursor>(nextCursor).payload;
    } catch (error) {
      console.error('Error decoding cursor:', error);
      throw new BadRequestException('游标错误');
    }

    const data = await this.habitService.getHabitsByGroupId(habitGroupId, cursor);
    return data;
  }
  //通过habitId获取习惯任务的详情  makdownn  打卡信息

  @Get(':habitId')
  async getHabitDetailByHabitId(@Param('habitId') habitId: string, @Query('nextCursor') nextCursor?: string): Promise<any> {
    let cursor: FocusCursor | null = null;
    if (!nextCursor) {
      return await this.habitService.getHabitDetailByHabitId(habitId, null);
    }
    //首先解码nextCursor
    try {
      cursor = decodeCursor<FocusCursor>(nextCursor).payload;
    } catch (error) {
      console.error('Error decoding cursor:', error);
      throw new BadRequestException('游标错误');
    }

    const data = await this.habitService.getHabitDetailByHabitId(habitId, cursor);
    return data;
  }


// 获取最近七天每天的完成情况（总数 | 完成数）
@Get('lastSevenDaiesData')
 @ApiOperation({ summary: '获取最近七天的打卡统计', description: '返回最近七天每天的任务总数与完成数' })
  @ApiQuery({ name: 'date', required: false, type: String, description: '结束日期（格式为 YYYY-MM-DD），默认为当前日期' })
async getLastSevenDaiesData(
  @CurrentUser('userId') userId: string,
  @Query('date') date?: string
): Promise<RateDto[]> {
  // 如果没传 date，默认用当前时间；否则解析传入的字符串为 Date 对象
  const endDate = date ? new Date(date) : new Date();

  const data = await this.habitService.getLastSevenDaiesData(userId, endDate);
  return data;
}

 @Post()
  @ApiOperation({ summary: '创建新的习惯任务', description: '提交一个新的习惯任务，包括名称、周期等信息' })
  @ApiBody({ type: CreateHabitTaskDto })
  @ApiResponse({ status: 201, description: '成功创建', type: HabitTask })
  async createHabitTask(
    @Body() dto: CreateHabitTaskDto,
    @CurrentUser('userId') userId: string,
  ) {
    return this.habitService.createHabit(dto,userId);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改习惯任务', description: '根据 ID 修改已有的习惯任务信息' })
  @ApiBody({ type: UpdateHabitTaskDto })
  @ApiResponse({ status: 200, description: '成功修改', type: HabitTask })
  async updateHabitTask(
    @Param('id') id: string,
    @Body() dto: UpdateHabitTaskDto,
    @CurrentUser('userId') userId: string,
  ) {
    return this.habitService.updateHabit( dto,userId);
  }


  //获取还在持续的habit --分页
  async  getIsLastHabits(@CurrentUser('userId') userId: string, @Query() nextCursor: string,@Query() timestamp:TimestampDto ):Promise<MyApiResponse<PaginatedResult<HabitTask>>>{
    const cursor= verifyCursor<TaskCursor>(nextCursor,"TaskCursor")
    const data= await this.habitService.getIsLastHabits(userId,cursor,timestamp.timestamp)
    return MyApiResponse.success(data,`${userId}:还在持续的数据获取成功`,200)
  }
  //获取所有的habits分组
async getAllHabitGroupsByUserId(@CurrentUser('userId') userId:string):Promise<MyApiResponse<HabitGroup[]>>{
  const data= await this.habitService.getAllHabitGroupsByUserId(userId)
  return MyApiResponse.success(data,`${userId}获取所有habit组群数据成功`,200)
}
}
