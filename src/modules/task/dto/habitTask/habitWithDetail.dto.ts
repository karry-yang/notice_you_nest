import { PartialType } from "@nestjs/swagger";
import { HabitTask } from "@task/entities/habit-task.entity";
import { HabitFocus } from "src/modules/checkIn/entities/habit-focus.entity";


/**
 * @description HabitTaskWithDetail 用于存储习惯任务的详细信息，键是任务 ID，值是任务详情对象。
 */
export class HabitTaskWithDetail<T = any> {
  habitId!:string
//mark文档
  markDown?: string | null;

  //日志
  focus?:HabitFocus[]



}
