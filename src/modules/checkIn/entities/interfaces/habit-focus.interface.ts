import { IManualAuditableBase } from 'src/common/shared/baseInterface/manualAuditableBase.interface';
import { HabitTask } from '@task/entities/habit-task.entity';

export interface IHabitFocus extends IManualAuditableBase {
  habitFocusId: string;

  habitTaskId: string;
  //开始时间
  habitTaskStartTime: Date;
  //结束时间
  habitTaskEndTime: Date;
  //是否有效
  isEffective: boolean;
  //日志
  habitTaskFocusLog?: string;
  habit?: HabitTask;
}
