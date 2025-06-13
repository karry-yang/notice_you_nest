import { IManualAuditableBase } from "src/common/shared/baseInterface/manualAuditableBase.interface";
import { HabitTask } from "../habit-task.entity";

export interface IHabitGroup extends IManualAuditableBase{
    habitGroupId:string
    habitGroupTitle:string
    habitTasks?:HabitTask[] 

}