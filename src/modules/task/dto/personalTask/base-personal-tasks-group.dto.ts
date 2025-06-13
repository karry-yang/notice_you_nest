import { TaskCheckinStatusEnum } from "@shared/enum/TaskCheckinStatusEnum";
import { PersonalTask } from "@task/entities/personal-task.entity";

/**
 * @description  按照listicleId OR tagId进行分组后的PersonalTask  可选树形 清单或者标签任意一个种类
*/
export  class BasePersonalTasksGroupDto {
  //清单分组
  listicleId?: string;
  listicleTitle?: string;
  //标签分组
  tagId?:string;
  tagTitle?:string;
  tagCorlor?:string;
  //打卡状态分组
  checkinStatus?:TaskCheckinStatusEnum
  //下页浮标
  nextCursor?: string | null;
  //任务主体
  personalTasks!:PersonalTask[]
}
