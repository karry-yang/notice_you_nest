import { tr } from '@faker-js/faker/.';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePersonalTaskDto } from '@task/dto/personalTask/create-personal-task.dto';
import { PersonalTaskWithPagination } from '@task/dto/personalTask/detail-personal-tasks-with-pagination.dto';
import { PersonalTaskFilter } from '@task/dto/personalTask/psersonal-task-filter.dto';
import { QueryDetailDto } from '@task/dto/personalTask/queryDetail.dao';
import { UpdatePersonalTaskDto } from '@task/dto/personalTask/update-personal-task.dto';
import { PersonalTask } from '@task/entities/personal-task.entity';
import { IListicleService } from '@task/services/interface/listicle-server.interface';
import { IPersonalTaskService } from '@task/services/interface/personal-task-server.interface';
import { ITagService } from '@task/services/interface/tag-server.interface';
import { error } from 'console';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { MyApiResponse } from 'src/common/dto/api-response.dto';
import { IListicleServiceToken, IPersonalTaskServiceToken, ITagServiceToken } from 'src/common/token/tokens';
import { decodeCursor, encodeCursor, PaginatedResult, TaskCursor } from 'src/common/types/paginatedResult.interface';
import { ObjectId } from 'typeorm';


/**
 * 获取最近七天更新的数据 或创建的数据
 * 获取修改或者删除的数据
 * 获取任务详情+内容
 * 创建任务
 * 修改任务
 * 删除任务
 * 获取明天应该执行的任务
 * 获取一周每天的打卡情况
 * 分页获取top任务
*/
@ApiTags('personalTask')
@Controller('personalTask')
export class PersonalTaskController {
  constructor(@Inject(IPersonalTaskServiceToken) private readonly personalTaskServer: IPersonalTaskService,
  @Inject(IListicleServiceToken)
private listicleServer:IListicleService,
@Inject(ITagServiceToken)
private  readonly tagServer:ITagService) {}

  //获取所有top任务  分页
  @ApiBearerAuth()
  @ApiOperation({ description: '获取用户(最近七天更新或者添加的数据,获取今天需要打卡的数据,获取明天需要打卡的数据,分页top数据)的数据',summary: '用户首次加载私有任务', })
  @ApiQuery({ name: 'userId',required: true,type: String,description: '用户id'})
  @ApiOkResponse({description: '用户首次加载私有任务页面数据成功', type: MyApiResponse<PersonalTaskWithPagination[]>})
  @ApiExtraModels(MyApiResponse, PersonalTaskWithPagination)
  @ApiResponse({ status: 400, description: '没有登录,JWT认证未通过或登录过期' })
  @ApiResponse({ status: 500, description: '服务器内部错误，任务获取失败' })
  @Get('first-load')
  async getAllPersonalTaskGroupByLisicle(@CurrentUser('userId') userId: string ): Promise<MyApiResponse<any>> {
 //获取top任务  nextCursor=null  limit =10
 //获取最近七天的数据
 //获取今天要打卡的数据
 //获取明天需要打卡的数据
 //获取最近一周修改/添加 
 //获取时间戳后新的更新数据->从redis中获取
 //最近时间戳后添加的新任务->从redis中获取
 //最近时间戳后删除的任务ids->从redis中获取
 //获取所有的清单
 //获取所有的标签  
 const [
   topPersonalTasks,
   recent7daysPersonalTasks,
   tomorrowPersonalTasks,
   todayPersonalTasks,
   recentUpdatePersonalTasks,
   // AddedPersonalTasks,
   // deletedPersonalTaskids,
   allListicles,
   allTags
 ]= await Promise.all(
  [
 this.personalTaskServer.getTopPersonalTasks(userId,null,10),
 this.personalTaskServer.getPersonalTasksRencent(userId,10,),
 this.personalTaskServer.getPersonalTasksForTomorrow(userId,null,10),
 this.personalTaskServer.getPersonalTasksForToday(userId,null,10),
 this.personalTaskServer.getPersonalTasksRencent(userId,10,null),
this.listicleServer.getListicleByUserId(userId),
this.tagServer.getTagsByUserId(userId)
  ]
 )
    //判断数据是否有  
return  MyApiResponse.success({
  topPersonalTasks,
   recent7daysPersonalTasks,
   tomorrowPersonalTasks,
   todayPersonalTasks,
   recentUpdatePersonalTasks,
   allListicles,
   allTags},'成功',200)
  }
  // 最近七天更新或者添加的数据
  async   getRecent7dayPersonalTask(@CurrentUser('userId') userId:string,)
  //获取所有任务摘要  
  async getAllPersonalTasksSummary(@CurrentUser('userId') userId: string, @Query() filter: PersonalTaskFilter): Promise<MyApiResponse<PersonalTask>> {
    throw error;
  }
  //条件查询 分页(今日，每周任务，清单，标签分类)
  async getPersonalTaskByFilter(@CurrentUser('userId') userId: string, @Query() filter: PersonalTaskFilter): Promise<MyApiResponse<PaginatedResult<PersonalTaskWithPagination>>> {
    throw error;
  }

  //创建
  async createPersonalTask(@CurrentUser('userId') userId: string, task: CreatePersonalTaskDto): Promise<MyApiResponse<PersonalTask>> {
    throw error;
  }
  //修改
  async updatePersonalTask(@CurrentUser('userId') userId: string, task: UpdatePersonalTaskDto): Promise<MyApiResponse<PersonalTask>> {
    throw error;
  }
  //删除
  async deletePersonalTask(@CurrentUser('userId') userId: string, taskIds: string[]): Promise<MyApiResponse> {
    const data= await  this.personalTaskServer.deletePersonalTask(userId,taskIds)
    if(data?length>0){
      
    }
    throw error;
  }
  //获取任务详情
  async   getPersonTaskContentByTaskId(@CurrentUser('userId') userId:string,@Query() dto :QueryDetailDto):Promise<MyApiResponse<any>>{
  
    const data= await this.personalTaskServer.getPersonalTaskContent(userId,dto)
    if(data)  return MyApiResponse.success(data,`任务${dto.taskId}详情内容获取成功`,200)
    return MyApiResponse.error(`任务${dto.taskId}详情内容获取失败`,500,null)
  }
}
