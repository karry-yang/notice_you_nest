import { IManualAuditableBase } from 'src/common/shared/baseInterface/manualAuditableBase.interface';
import { PersonalTask } from '../personal-task.entity';
import { PersonalCheckin } from '../../../checkIn/entities/personal-checkin.entity';
import { CheckinRule } from '../task-checkin-rule.entity';
import { PriorityEnum } from 'src/common/shared/enum/PriorityEnum';
import { Tag } from '../tag.entity';
import { PersonalTaskTag } from '../personal-task-tag.entity';
export interface IPersonalTask extends IManualAuditableBase {
  taskId: string;

  taskTitle: string;

  taskPriority: PriorityEnum;

  // taskCheckinRuleId: string;

  taskParentId: string;

  taskObjectId: string;

  taskDescription: string;

  taskStartTime: Date;

  taskEndTime: Date;
  listicleId: string;

  //多对一
  parent?: PersonalTask;

  //一对一
  // checkinRule?: CheckinRule;
  hasFiles: boolean;
  //一对多
  children?: PersonalTask[];

  //打卡数组 关联中间表  一个任务对应多个打卡表数据   一个用户对于一个任务有多个打卡数据
  checkes: PersonalCheckin[];
  personalTaskTags: PersonalTaskTag[];
}
