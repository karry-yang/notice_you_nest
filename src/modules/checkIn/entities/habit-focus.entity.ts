import { ManualAuditableBase } from 'src/common/shared/baseEntity/manualAuditable.entity';
import { IHabitFocus } from './interfaces/habit-focus.interface';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { HabitTask } from '@task/entities/habit-task.entity';

@Entity(`hobit_focus`)
export class HabitFocus extends ManualAuditableBase implements IHabitFocus {
  @PrimaryColumn({ name: 'hobit_focus_id', type: 'bigint', comment: '习惯任务专注表主键id' })
  habitFocusId!: string;

  @Column({ name: 'hobit_task_id', type: 'bigint', nullable: false, comment: '对应的习惯任务id' })
  habitTaskId!: string;
  //开始时间
  @Column({ name: 'hobit_task_start_time', type: 'timestamp', comment: '专注开始时间' })
  habitTaskStartTime!: Date;

  //结束时间
  @Column({ name: 'hobit_task_end_time', type: 'timestamp',  comment: '专注结束时间' })
  habitTaskEndTime!: Date;

  //是否有效
  @Column({ name: 'is_effective', type: 'tinyint', nullable: false, comment: '本次专注是否有效' })
  isEffective!: boolean;
  //日志

  @Column({ name: 'hobit_task_focus_log', type: 'varchar', length: 255, nullable: true, comment: '专注日志' })
  habitTaskFocusLog?: string;

  @ManyToOne(() => HabitTask, (habitTask) => habitTask.focus)
  @JoinColumn({ name: 'habitTaskId' })
  habit?: HabitTask;
}
