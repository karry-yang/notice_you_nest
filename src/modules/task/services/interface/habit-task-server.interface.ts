import { CreateHabitTaskDto } from "@task/dto/habitTask/createHabitTask.dto";
import { HabitTaskWithDetail } from "@task/dto/habitTask/habitWithDetail.dto";
import { UpdateHabitTaskDto } from "@task/dto/habitTask/updateHabitTask.dto";
import { HabitGroup } from "@task/entities/habit-group.entity";
import { HabitTask } from "@task/entities/habit-task.entity";
import { FocusCursor, PaginatedResult, TaskCursor } from "src/common/types/paginatedResult.interface";
import { RateDto } from "src/modules/checkIn/dto/common/rate.dto";

export interface IHabitTaskService {


    /**
     * @description  创建行的habitask
    */
   createHabit(createHabit:CreateHabitTaskDto,userId:string):Promise<HabitTask | null>
  /**
   * @description 用户使用id查询所有的习惯任务
  */
 getHabitsByUserId(userId:string,nextCousor:TaskCursor | null):Promise<PaginatedResult<HabitTask> >;

  /**
   * @description 用户组群id查询所有的习惯任务
  */
  getHabitsByGroupId(groupId: string, nextCursor: TaskCursor | null): Promise<PaginatedResult<HabitTask>>
/**
 * @description   查看习惯详情
*/
  getHabitDetailByHabitId(habitId:string,nextCousor:FocusCursor| null):Promise<HabitTaskWithDetail| null>

/**
 * @description   修改单个习惯  
 * @param UpdateHabitTaskDto内部使用了habitId
*/

  updateHabit(updateHabit:UpdateHabitTaskDto,userId:string):Promise<HabitTask | null>


  /**
   * @description  获取最近七天的专注数据  总数和专注数   比率前端自己计算
  */
   getLastSevenDaiesData(userId:string,date:Date):Promise<RateDto[]>


   /**
    * @description   获取还在持续的habit数据
   */

   getIsLastHabits(userId:string,cursorObj:TaskCursor | null,timestamp:Date):Promise<PaginatedResult<HabitTask>>


   /**
    * @description   获取用户所有的habit分组数据
   */

  getAllHabitGroupsByUserId(userId:string):Promise<HabitGroup[]>
}
