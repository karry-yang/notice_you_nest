import { TaskTypeEnum } from '@shared/enum/TaskTypeEnum';
import { IManualAuditableBase } from 'src/common/shared/baseInterface/manualAuditableBase.interface';
import { TaskCheckinType } from 'src/common/shared/enum/TaskCheckinType';
import { PersonalTask } from '../personal-task.entity';

export interface ITaskCheckinRule extends IManualAuditableBase {
  ruleId: string;
  //打卡类型    天 时间
  ruleType: TaskCheckinType;
  // taskId:string
  taskType: TaskTypeEnum;

  //打卡日期  json
  days?: string[];
  //打卡时间 json

  times?: string[];

  intervalDays?: number; // 如果是 INTERVAL，自定义的间隔天数
  task: PersonalTask;
}
