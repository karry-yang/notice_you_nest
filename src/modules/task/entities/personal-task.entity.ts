import { ManualAuditableBase } from 'src/common/shared/baseEntity/manualAuditable.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, OneToOne, Index } from 'typeorm';
import { PriorityEnum } from 'src/common/shared/enum/PriorityEnum';

import { CheckinRule } from './task-checkin-rule.entity';

import { IPersonalTask } from './interfaces/personal-task.interface';
import { PersonalCheckin } from 'src/modules/checkIn/entities/personal-checkin.entity';

import { PersonalTaskTag } from './personal-task-tag.entity';


@Entity('personal_task')
export class PersonalTask extends ManualAuditableBase implements IPersonalTask {
  @PrimaryGeneratedColumn({ name: 'task_id', type: 'bigint', comment: '任务ID' })
  taskId!: string;

  @Column({ name: 'task_title', type: 'varchar', length: 255, comment: '任务标题' })
  taskTitle!: string;

  @Column({ name: 'task_priority', type: 'tinyint', default: 0, comment: '任务优先级（0-3）' })
  taskPriority: PriorityEnum = PriorityEnum.ZERO;

  @Column({ name: 'task_parent_id', type: 'bigint', nullable: true, comment: '父任务id' })
  taskParentId!: string;

  //设置与id一致 同步id提高效率
  @Column({ name: 'task_object_id', type: 'varchar', length: 24, nullable: true, comment: '任务正文 MongoDB ObjectId' })
  taskObjectId!: string;

  @Column({ name: 'listicle_id', type: 'bigint', nullable: true, comment: '所属清单ID' })
  listicleId!: string;

  @Column({ name: 'task_description', type: 'text', nullable: true, comment: '任务简要说明' })
  taskDescription!: string;

  @Column({ name: 'task_start_time', type: 'timestamp', nullable: true, comment: '任务开始时间' })
  taskStartTime!: Date;

  @Column({ name: 'task_end_time', type: 'timestamp', nullable: true, comment: '任务结束时间' })
  taskEndTime!: Date;

  @Column({ name: 'has_files', type: 'bool', default: false, comment: '是否有文件' })
  hasFiles!: boolean;

  @Index()
  @Column({ name: 'path', type: 'varchar', length: 255, nullable: true, comment: '任务路径' })
  path: string | null = null;

  // === 自引用关系 ===
  @ManyToOne(() => PersonalTask, (task) => task.children, { nullable: true })
  @JoinColumn({ name: 'task_parent_id', referencedColumnName: 'taskId' })
  parent?: PersonalTask;

  @OneToMany(() => PersonalTask, (task) => task.parent, { nullable: true })
  children!: PersonalTask[];

  @OneToMany(() => PersonalCheckin, (personalCheckin) => personalCheckin.checkinTaskId)
  checkes!: PersonalCheckin[];
  @OneToMany(() => PersonalTaskTag, (personalTaskTag) => personalTaskTag.personalTaskId)
  personalTaskTags!: PersonalTaskTag[];

  @OneToOne(() => CheckinRule, (checkinRule) => checkinRule.ruleId)
  checkinRule?: CheckinRule;
}
