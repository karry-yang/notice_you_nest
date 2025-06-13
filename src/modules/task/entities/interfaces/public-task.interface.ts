import { IManualAuditableBase } from 'src/common/shared/baseInterface/manualAuditableBase.interface';
import { PublicTask } from '../public-task.entity';
import { PublicCheckin } from '../../../checkIn/entities/public-checkin.entity';
import { PublicTaskAssignee } from '../public-task-assignee.entity';
import { CheckinRule } from '../task-checkin-rule.entity';
import { TaskTypeEnum } from 'src/common/shared/enum/TaskTypeEnum';
import { User } from '@user/entities/user.entity';
import { PriorityEnum } from 'src/common/shared/enum/PriorityEnum';
import { ListicleTypeEnum } from 'src/common/shared/enum/ListicleTypeEnum';

export interface IPublicTask extends IManualAuditableBase {
  taskId: string;

  taskTitle: string;

  taskPriority: PriorityEnum;

  taskCheckinRuleId: string;

  taskParentId: string;

  taskObjectId: string;

  departmentId: string;
  organizationId: string;

  taskDescription: string;

  taskStartTime: Date;

  taskEndTime: Date;
  //类型 department   organization   user
  taskListicleType: ListicleTypeEnum;
  taskRectorId: string;
  hasFiles:boolean;

  //多对一
  parent?: PublicTask;

  //一对一
  checkinRule?: CheckinRule;
  //一对多
  children?: PublicTask[];
  //一对多
  // assignees: PublicTaskAssingee[];
  //打卡数组 关联中间表  一个任务对应多个打卡表数据   一个用户对于一个任务有多个打卡数据
  checkes: PublicCheckin[];
  // //创建人对象 User
  // creater?: User ;
  //一对多
  rector: User[];
}
