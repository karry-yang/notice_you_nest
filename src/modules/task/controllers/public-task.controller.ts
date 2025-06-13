import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Controller, Get, Post, Delete, Inject, Body, Param, NotFoundException, UseGuards, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IPublicTaskService } from '@task/services/interface/public-task-server.interface';
import { MyApiResponse } from 'src/common/dto/api-response.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CurrentUserDto } from 'src/common/dto/current-user.dto';

import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { error } from 'console';
import { PaginatedResult } from 'src/common/types/paginatedResult.interface';
import { PublicTask } from '@task/entities/public-task.entity';
import { IPublicTaskServiceToken } from 'src/common/token/tokens';

@ApiTags('public-task请求服务')
@Controller('public-task')
export class PublicTaskController {
  constructor(
    @Inject(IPublicTaskServiceToken) private readonly publicTaskService: IPublicTaskService

  ) {}

  //获取单个公开任务的所有信息-详情
  @Get(':taskId')
  @UseGuards(JwtAuthGuard) // 需要JWT验证才能访问
  @ApiOperation({ summary: '获取单个公开任务的所有信息', description: '获取单个公开任务的所有信息 req{id:string->任务id}' })
  @ApiResponse({ status: 200, description: '请求成功' })
  @ApiResponse({ status: 500, description: '请求失败' })


  async getPublicTaskById(@Param('taskId') taskId: string): Promise<MyApiResponse> {
    const publicTaslWithDeTail = this.publicTaskService.getById(taskId);
    if (publicTaslWithDeTail !== undefined || publicTaslWithDeTail === null) {
      throw new NotFoundException('找不到这个任务');
    }
    return MyApiResponse.success(publicTaslWithDeTail, '获取公开任务成功');
  }



 

  //管理员查看部门公开任务
  //管理员查看公开任务详情

  //按照清单进行任务加载
  @Get(':licticleId')
  @UseGuards(JwtAuthGuard) // 需要JWT验证才能访问
  @ApiOperation({ summary: '获取某个清单下的所有公开任务', description: '接收者获取某个清单下的所有公开任务 @Param listicleId:string->清单id,@Param nextCursor:number,hasNextPage:number' })
  @ApiResponse({ status: 200, description: '请求成功' })
  async getALlPublicTaskByListicleId(@CurrentUser() user: CurrentUserDto, @Param('listicleId') listicleId: string, @Query('nextCursor') nextCursor :{ checkin_time: string | null; assingee_id: string | null } | null,) {
    // user 就是当前登录用户
    const data = await this.publicTaskService.getByListcleId(listicleId, user.userId, nextCursor);
    if (!data || data.data.length === 0) {
      throw new NotFoundException('没有找到相关的公开任务');
    }
    return MyApiResponse.success(data, '获取公开任务成功', 200);
  }

  //发布者查看所有自己发布的公开任务
  @Get('create-by/:createBy')
  @UseGuards(JwtAuthGuard) // 需要JWT验证才能访问
  @ApiOperation({ summary: '获取某个用户发布的所有公开任务', description: '获取某个用户发布的所有公开任务 @Param createBy:string->创建者id,@Query nextCursor:number,hasNextPage:number' })
  @ApiResponse({ status: 200, description: '请求成功' })
  async getAllPublicTasksByCreateBy(@Param('createBy') createBy: string, @Query('nextCursor') nextCursor :string, @Query('hasNextPage') hasNextPage = 10): Promise<MyApiResponse> {
    const data = await this.publicTaskService.getByCreateBy(createBy, nextCursor);
    if (!data || data.data.length === 0) {
      throw new NotFoundException('没有找到相关的公开任务');
    }
    return MyApiResponse.success(data, '获取公开任务成功', 200);
  }

  //部门管理查看所有部门相关的公开任务
  @Get('department/:listicleId')
  @UseGuards(JwtAuthGuard, RolesGuard) // 需要JWT验证才能访问
  @Roles('ADMIN-DEP') // 只有部门管理员角色可以访问s
  @ApiOperation({ summary: '获取某个部门的所有公开任务', description: '获取某个部门的所有公开任务 @Param listicleId:string->部门id,@Query nextCursor:number,hasNextPage:number' })
  @ApiResponse({ status: 200, description: '请求成功' })
  async getAllPublicTasksByListicleId(@Param('listicle') listicleId: string, @Query('nextCursor') nextCursor?: string, @Query('hasNextPage') hasNextPageRaw?: string): Promise<MyApiResponse> {
    const cursor = !nextCursor || nextCursor === 'null' ? null : nextCursor;
    const haveNextPage = hasNextPageRaw === 'true';

    const data: PaginatedResult<PublicTask> = await this.publicTaskService.getAllPublicTasksByListicleId(listicleId, cursor, haveNextPage);

    if (!data || data.data.length === 0) {
      throw new NotFoundException('没有找到相关的公开任务');
    }
    return MyApiResponse.success(data, '获取公开任务成功', 200);
  }

  //查看所有接收到的公开任务，不分页  获取每个共有清单的前10条就好了  之后的清单中的数据再使用分页的方式去获取

  @Get('allPublic')
  @UseGuards(JwtAuthGuard, RolesGuard) // 需要JWT验证才能访问
  @Roles('User') // 部门用户即可访问
  async acceptAllPublicTasks(@Param('userId') userId: string): Promise<MyApiResponse> {
    throw error;
  }
}
