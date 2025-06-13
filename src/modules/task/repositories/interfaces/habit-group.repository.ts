import { CreateHabitGroupDto } from "@task/dto/habitGroup/createHabitGroup.dto";
import { UpdateHabitGroupDto } from "@task/dto/habitGroup/updateHabitGroup.dto";
import { HabitGroup } from "@task/entities/habit-group.entity";
import { UpdateDepartmentDto } from "@user/dto/department/update-department.dto";

export  interface IHabitGroupRepository{
/**
 * @description 通过id查询分组
*/
findById(id:string):Promise<HabitGroup | null>
//通过用户id
/**
 * @description 通过用户查询用户习惯所有分组
*/
fidnByUserId(userId:string):Promise<HabitGroup[] | []>
//修改
//只能修改名
/**
 * @description   修改分组   UpdateHabitGroupDto只是包含名字
*/
updateHabitGroup(updateHabitGroup:UpdateHabitGroupDto):Promise<HabitGroup| null>
//增加
/**
 * @description  创建新的habit分组
*/
createHabitGroup(id: string, name:string, userId:string ):Promise<HabitGroup | null>
}