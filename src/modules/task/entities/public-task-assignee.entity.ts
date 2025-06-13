import { ManualAuditableBase } from 'src/common/shared/baseEntity/manualAuditable.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { PublicTask } from './public-task.entity';
import { User } from '@user/entities/user.entity';
import { ReadStatus } from 'src/common/shared/enum/ReadStatus';
import { IPublicTaskAssignee } from './interfaces/public-task-assignee.interface';

@Entity('public_task_assignee')
export class PublicTaskAssignee extends ManualAuditableBase implements IPublicTaskAssignee {
  @PrimaryColumn({ name: 'public_task_assingee_id', type: 'bigint', comment: '任务和任务指派表id-主键' })
  publicTaskAssingeeId!: string;

  @Column({ name: 'public_task_id', type: 'bigint', comment: '公开任务id' })
  publicTaskId!: string;

  @Column({ name: 'assingee_id', type: 'bigint', comment: '被指派的用户id' })
  assigneeId!: string;

  @ManyToOne(() => PublicTask ,(publicTask)=>publicTask.assignees)
  @JoinColumn({ name: 'publicTaskId',referencedColumnName: 'taskId' })
  publicTask?: PublicTask;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'assingeeId',referencedColumnName:'userId' })
  assignee?: User[];

  isRead:ReadStatus=ReadStatus.UNREAD
}
