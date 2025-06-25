import { ManualAuditableBase } from 'src/common/shared/baseEntity/manualAuditable.entity';
import { TaskCheckinType } from 'src/common/shared/enum/TaskCheckinType';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ITaskCheckinRule } from './interfaces/task-checkin-rule.interface';
import { TaskTypeEnum } from '@shared/enum/TaskTypeEnum';
import { PersonalTask } from './personal-task.entity';

@Entity(`checkin_rule`)
export class CheckinRule extends ManualAuditableBase implements ITaskCheckinRule {
  @PrimaryColumn({ name: 'rule_id', type: 'bigint', comment: '打卡规则表id' })
  ruleId!: string;
  // @Column({ name: 'task_id', type: 'bigint', comment: '关联的打卡规则ID',  nullable:false })
  // taskId!: string;
  @Column({ name: 'task_type', type: 'enum', comment: '关联的任务类型', nullable: false })
  taskType!: TaskTypeEnum;
  //打卡类型    天 时间
  @Column({ name: 'rule_type', type: 'enum', enum: TaskCheckinType, default: TaskCheckinType.DAILY })
  ruleType: TaskCheckinType = TaskCheckinType.DAILY;

  //打卡日期  json
  @Column({ name: 'days', type: 'json', nullable: true })
  days?: string[] = [];
  //打卡时间 json
  @Column({
    name: 'times',
    type: 'json',
    nullable: true,
    // default: () => '\'["08:00"]\'',
    comment: '打卡时间 json',
  })
  times?: string[] = ['08:00'];

  @Column({ name: 'interval_days', type: 'int', nullable: true, comment: '特定规律的间隔' })
  intervalDays?: number; // 如果是 INTERVAL，自定义的间隔天数

  @OneToOne(() => PersonalTask, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rule_id', referencedColumnName: 'taskId' })
  task!: PersonalTask;
}
