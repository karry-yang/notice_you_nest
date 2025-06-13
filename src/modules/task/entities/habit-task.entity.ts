import { ManualAuditableBase } from 'src/common/shared/baseEntity/manualAuditable.entity';
import { IHabitTask } from './interfaces/habit-task.interface';
import { SettingSwitchEnum } from 'src/common/shared/enum/SettingSwitchEnum';
import { HabitGroup } from './habit-group.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { HabitFocus } from 'src/modules/checkIn/entities/habit-focus.entity';

//开始 结束 专注
@Entity(`habit_task`)
export class HabitTask extends ManualAuditableBase implements IHabitTask {
  @PrimaryColumn({ name: 'habit_task_id', type: 'bigint', comment: '习惯任务id' })
  habitTaskId!: string;

  @Column({ name: 'user_id', type: 'bigint', nullable: false, comment: '关联的用户id ' })
  userId!: string;
  @Column({ name: 'task_title', type: 'varchar', length: 255, comment: '习惯任务标题' })
  habitTaskTitle!: string;
  //持续的天数
  @Column({ name: 'task_start_time', type: 'datetime', comment: '习惯任务开始时间' })
  habitTaskStartTime!: Date;

  @Column({ name: 'task_end_time', type: 'datetime', comment: '习惯任务结束时间' })
  habitTaskEndTime!: Date;

  @Column({ name: 'habit_task_descriptio', type: 'varchar', length: 255, comment: '任务描述' })
  habitTaskDescription?: string;

  @Column({ name: 'habit_task_notice_time', type: 'json', comment: '习惯任务提示时间' })
  habitTaskNoticeTime?: string;

  @Column({ name: 'hobit_task_open_log', type: 'enum', enum: SettingSwitchEnum, default: SettingSwitchEnum.OFF, comment: '是否开启日志默认 off' })
  habitTaskOpenLog: SettingSwitchEnum = SettingSwitchEnum.OFF;

  @Column({ name: 'hobit_task_group_id', type: 'bigint', comment: '习惯任务分组id' })
  habitTaskGroupId!: string;
    //设置与id一致 同步id提高效率
  @Column({name:'taskObject_id', type: 'varchar', length: 24, nullable: true, comment: '任务正文 MongoDB ObjectId' })
  taskObjectId!: string;

  @ManyToOne(() => HabitGroup, (habitGroup) => habitGroup.habitTasks)
  @JoinColumn({ name: 'habit_task_group_id' })
  habitGroup?: HabitGroup;

  @OneToMany(() => HabitFocus, (habitFocus) => habitFocus.habit)
  focus?: HabitFocus[];
}
