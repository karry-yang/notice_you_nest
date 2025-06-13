import { FocusCursor, PaginatedResult } from "src/common/types/paginatedResult.interface";
import { HabitFocus } from "../../entities/habit-focus.entity";
import { CreateFocusDto } from "../../dto/focus/create-focus.dto";
import { StartFocusDto } from "../../dto/focus/startFocus.dto";
import { EndFocusDto } from "../../dto/focus/endFocus.dto";

export interface IFocusService{
    //查询habit专注详情  分页
    getFocusesByHabitId(habitId:string,nextCursor:FocusCursor | null):Promise<PaginatedResult<HabitFocus>>;
    
    /**
     * @description 开启一个新的专注
     * @param  userId  用户id
     * @param  habitTaskId  babitId
     * 
    */
    startFocus(userId:string,startFocus:StartFocusDto):Promise<boolean>
    endFocus(userId:string,endFocus:EndFocusDto):Promise<HabitFocus>
    //删除专注
    deleteFocus(focusId:string):Promise<boolean>

      //获取糖果数量==总有效专注
       //获取habit总专注数
}