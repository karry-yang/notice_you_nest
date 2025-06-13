import { IManualAuditableBase } from 'src/common/shared/baseInterface/manualAuditableBase.interface';
import { TaskCheckinStatusEnum } from 'src/common/shared/enum/TaskCheckinStatusEnum';
import { PublicTask } from '@task/entities/public-task.entity';

export interface IPublicCheckin extends IManualAuditableBase {
  checkinId: string;
  checkinTime: Date;
  checkinLog: string;
  taskId: string;
  checkinUserId: string;
  checkinStatus: TaskCheckinStatusEnum;
  organizationId: string;
  departmentId: string;

  publicTask?: PublicTask;
}
