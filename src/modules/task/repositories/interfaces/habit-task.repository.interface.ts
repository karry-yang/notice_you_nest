import { CreateHabitGroupDto } from '@task/dto/habitGroup/createHabitGroup.dto';
import { UpdateHabitGroupDto } from '@task/dto/habitGroup/updateHabitGroup.dto';
import { CreateHabitTaskDto } from '@task/dto/habitTask/createHabitTask.dto';
import { UpdateHabitTaskDto } from '@task/dto/habitTask/updateHabitTask.dto';
import { HabitGroup } from '@task/entities/habit-group.entity';
import { HabitTask } from '@task/entities/habit-task.entity';
import { CheckinCursor, PaginatedResult, TaskCursor } from 'src/common/types/paginatedResult.interface';
import { RateDto } from 'src/modules/checkIn/dto/common/rate.dto';

export interface IHabitTaskRepository {
 
//   /**
//  * @description    
// */
//   findById(id: string): Promise<HabitTask | null>;

  /**
 * @description  通过habitTaskId查询 通过id查询 包含基本西信息  专注信息 分组 
*/
 
  findHabitDetailByTaskId(habitTaskId: string): Promise<HabitTask | null>;

  /**
 * @description    通过用户id查询  仅仅获取基本信息 不获取详情
*/
  findByUserId(userId: string, nextCursor:TaskCursor| null): Promise< PaginatedResult<HabitTask>>;


  /**
   * @description  通过habitGroupId查询habits
  */
 findHabitsByGroupId(groupId:string,nextCursor:TaskCursor| null): Promise< PaginatedResult<HabitTask>>;



 /**
  * @description  查询某个用户最近七天每天的完成数和每天的总数
 */
findHabitsSevenDaiesData(userId:string,date:Date):Promise<RateDto[]>
  /**
 * @description   创建hobit,使用的getRepository(habitTask)，自动触发的createby，createAt,id在repository触发生成

 * @param createHabitTask

*/
  createHabitTask(createHabitTask: CreateHabitTaskDto,taskId:string): Promise<HabitTask | null>;

  /**
 * @description   修改habit
*/
  updateHabitTask(updateHabitTask: UpdateHabitTaskDto): Promise<HabitTask | null>;


  /**
   * @description   获取还在持续的所有习惯
   * 
  */
 findIsLastHabits(userId:string,nextCousor:TaskCursor | null,timestamp:Date,limit?:number):Promise<PaginatedResult<HabitTask>>



}
