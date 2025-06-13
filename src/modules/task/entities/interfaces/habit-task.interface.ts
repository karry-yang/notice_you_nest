import { IManualAuditableBase } from 'src/common/shared/baseInterface/manualAuditableBase.interface';
import { SettingSwitchEnum } from 'src/common/shared/enum/SettingSwitchEnum';
import { HabitGroup } from '../habit-group.entity';
import { HabitFocus } from 'src/modules/checkIn/entities/habit-focus.entity';

export interface IHabitTask extends IManualAuditableBase {
  habitTaskId: string;
  habitTaskTitle: string;
  habitTaskStartTime: Date;
  habitTaskEndTime: Date;

  habitTaskDescription?: string;
  taskObjectId: string;
  habitTaskNoticeTime?: string;
  habitTaskOpenLog: SettingSwitchEnum;
  habitTaskGroupId: string;
  //日志
  focus?: HabitFocus[];
  //分组

  habitGroup?: HabitGroup;
}
