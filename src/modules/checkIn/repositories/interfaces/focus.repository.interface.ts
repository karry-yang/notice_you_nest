import { FocusCursor, PaginatedResult } from 'src/common/types/paginatedResult.interface';
import { HabitFocus } from '../../entities/habit-focus.entity';
import { CreateFocusDto } from '../../dto/focus/create-focus.dto';
import { RateDto } from '../../dto/common/rate.dto';


export interface IFocusRespository {
  /** 
   * @description 通过id查询单条专注
  */
  
  findById(id: string): Promise<HabitFocus | null>;
  /**
   * @description 通过hobittaskid查询  需要分页
   * @param  habitTaskId 习惯id
   * @param   nextCousor {FocusCursor} 分页浮标
   */
  findByHabitTaskId(habitTaskId: string, nextCousor:FocusCursor | null): Promise<PaginatedResult<HabitFocus>>;
  /**
   * @description 增加
   * @param  createFocus {CreateFocusDto}  专注信息
   * @param userId  归属人id
  */
  createFocus(createFocus: CreateFocusDto,userId:string): Promise<HabitFocus | null>;

  /**
   * @description  删除专注记录
   * @param  focusId  专注记录id
   * @returns boolean
   * */ 
  deleteFocus(focusId:string):Promise<boolean>
  /**
   * @description   分任务统计专注次数和有效次数
   * @param  habitId  习惯id
   * @returns {totalCount:number,isEffectiveCount: number}
  */
  countFocusByHabitId(habitId:string):Promise<{totalCount:number,isEffectiveCount: number}>
/** 
 * @description 通过查询专注表获取某天已经专注的专注记录 ps  如果是验证习惯是否专注  使用isFocused   获取专注或者为专注habit从taskmoudel中获取
 * @param  time：Date{yyyy-mmmm-dddd}
 * @param  nextCousor 分页游标
 * @param userId   关联的用户id
*/
findFocused(time:Date,nextCousor:FocusCursor,userId:string):Promise<PaginatedResult<HabitFocus>>
/**
 * @description 验证今日已经专注
 * @param  habitId  habitId
 * @returns HabitFocus
*/
isFocused(habitId:string):Promise<HabitFocus>


/**
 * @description 获取七天的专注率数据
 * @param  habitId  habitId
 * @returns HabitFocus
*/
findHabitsSevenDaiesData(userId: string, endTime: Date): Promise<RateDto[]>
}
