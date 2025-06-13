import { User } from '@user/entities/user.entity';
import { IManualAuditableBase } from 'src/common/shared/baseInterface/manualAuditableBase.interface';
import { PublicTask } from '../public-task.entity';

//任务的负责人关联表   一个公开任务有多个负责人

export interface IPublicTaskRector extends IManualAuditableBase {
  publicTaskCretorId: string;
  publicTaskId: string;
  rectorId: string;

  publicTask?: PublicTask;
  cretor?: User;
}
