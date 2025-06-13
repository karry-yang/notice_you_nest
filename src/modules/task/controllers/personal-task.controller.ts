import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePersonalTaskDto } from '@task/dto/personalTask/create-personal-task.dto';
import { PersonalTaskWithPagination } from '@task/dto/personalTask/personal-tasks-with-pagination.dto';
import { PersonalTaskFilter } from '@task/dto/personalTask/psersonal-task-filter.dto';
import { UpdatePersonalTaskDto } from '@task/dto/personalTask/update-personal-task.dto';
import { PersonalTask } from '@task/entities/personal-task.entity';
import { IPersonalTaskService } from '@task/services/interface/personal-task-server.interface';
import { error } from 'console';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { MyApiResponse } from 'src/common/dto/api-response.dto';
import { IPersonalTaskServiceToken } from 'src/common/token/tokens';
import { decodeCursor, encodeCursor, PaginatedResult, TaskCursor } from 'src/common/types/paginatedResult.interface';

@ApiTags('personalTask')
@Controller('personalTask')
export class PersonalTaskController {
  constructor(@Inject(IPersonalTaskServiceToken) private readonly personalTaskServer: IPersonalTaskService) {}

  //获取所有任务  分页
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取用户(最近七天,今天,明天的)的数据',description: '', })
  @ApiQuery({ name: 'nextCursor',required: false,type: String,description: 'Base64 编码的分页游标，例如: base64({"task_id":"xxx","createdAt":"2000-02-09:xxx"})',})
  @ApiOkResponse({description: '私有任务获取成功', type: PersonalTaskWithPagination[],})
  @ApiExtraModels(MyApiResponse, PersonalTaskWithPagination)
  @ApiResponse({ status: 400, description: '没有登录,JWT认证未通过或登录过期' })
  @ApiResponse({ status: 500, description: '服务器内部错误，任务获取失败' })
  @Get('first-load')
  async getAllPersonalTaskGroupByLisicle(@CurrentUser('userId') userId: string, ): Promise<MyApiResponse<PersonalTaskWithPagination[]>> {
 
    const data= await  this.personalTaskServer.getPersonalTaskByUserId(userId,null)
    
    //判断数据是否有  
return  data?.data
  }
  //获取所有任务摘要  不分页 --- 前后端缓存
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
  async deletePersonalTask(@CurrentUser('userId') userId: string, taskId: string): Promise<MyApiResponse> {
    throw error;
  }
}
