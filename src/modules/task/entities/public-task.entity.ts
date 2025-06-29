import { ManualAuditableBase } from 'src/common/shared/baseEntity/manualAuditable.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, Index, OneToOne } from 'typeorm';
import { IPublicTask } from './interfaces/public-task.interface';
import { PriorityEnum } from 'src/common/shared/enum/PriorityEnum';
import { TaskTypeEnum } from 'src/common/shared/enum/TaskTypeEnum';
import { CheckinRule } from './task-checkin-rule.entity';
import { PublicTaskAssignee } from './public-task-assignee.entity';
import { PublicCheckin } from '../../checkIn/entities/public-checkin.entity';
import { User } from '@user/entities/user.entity';
import { PublicTaskRector } from './public-task-rector.entity';
import { ListicleTypeEnum } from 'src/common/shared/enum/ListicleTypeEnum';

/**
 * @description 公开任务实体类  公开任务加入oraganizationId和departmentId用于区分公开的范围  使用ListicleTypeEnum区分公开任务的类型
 */
@Entity('public_task')
export class PublicTask extends ManualAuditableBase implements IPublicTask {
  @PrimaryGeneratedColumn({ name: 'task_id', type: 'bigint', comment: '任务ID' })
  taskId!: string;

  @Column({ name: 'task_title', type: 'varchar', length: 255, comment: '任务标题' })
  taskTitle!: string;

  @Column({ name: 'task_priority', type: 'tinyint', default: 0, comment: '任务优先级（0-3）' })
  taskPriority: PriorityEnum = PriorityEnum.ZERO;

  @Column({ name: 'task_checkin_rule_id', type: 'bigint', comment: '关联的打卡规则ID' })
  taskCheckinRuleId!: string;

  @Column({ name: 'task_parent_id', type: 'bigint', nullable: true, comment: '父任务id' })
  taskParentId!: string;

  //设置与id一致 同步id提高效率
  @Column({ name: 'task_object_id', type: 'varchar', length: 24, nullable: true, comment: '任务正文 MongoDB ObjectId' })
  taskObjectId!: string;

  //区分公开任务所属的组织部门
  @Column({ name: 'department_id', type: 'bigint', nullable: true, comment: '所属部门清单ID' })
  departmentId!: string;
  @Column({ name: 'organization_id', type: 'bigint', nullable: true, comment: '所属组织ID' })
  organizationId!: string;

  @Column({ name: 'task_description', type: 'text', nullable: true, comment: '任务简要说明' })
  taskDescription!: string;

  @Column({ name: 'task_start_time', type: 'timestamp', nullable: true, comment: '任务开始时间' })
  taskStartTime!: Date;

  @Column({ name: 'task_end_time', type: 'timestamp', nullable: true, comment: '任务结束时间' })
  taskEndTime!: Date;

  //区分可阅读范围
  @Column({ name: 'task_listicle_type', type: 'enum', enum: ListicleTypeEnum, nullable: false, comment: '任务类型' })
  taskListicleType!: ListicleTypeEnum;

  @Column({ name: 'task_cretor_id', type: 'bigint', nullable: true, comment: '负责人ID' })
  taskRectorId!: string;

    @Index()
  @Column({ name: 'path', type: 'varchar', length: 255, nullable: true, comment: '任务路径' })
  path: string | null = null;

  // === 自引用关系 ===
  @ManyToOne(() => PublicTask, (task) => task.children, { nullable: true })
  @JoinColumn({ name: 'task_parentId' })
  parent?: PublicTask;

  @OneToOne(() => CheckinRule)
  @JoinColumn({ name: 'taskCheckinRuleId' })
  checkinRule!: CheckinRule;
    @Column({name:'has_files', type:'bool', default:false, comment:"是否有文件"})
  hasFiles !: boolean;

  @OneToMany(() => PublicTask, (task) => task.parent)
  children!: PublicTask[];

  @OneToMany(() => PublicTaskAssignee, (publicTaskAssignee) => publicTaskAssignee.publicTask)
  assignees!: PublicTaskAssignee[];

  @OneToMany(() => PublicCheckin, (publicCheckin) => publicCheckin.publicTask)
  checkes!: PublicCheckin[];

  @OneToMany(() => PublicTaskRector, (publicTaskCretor) => publicTaskCretor.rector)
  rector!: User[];
}
