import { ManualAuditableBase } from 'src/common/shared/baseEntity/manualAuditable.entity';
import { IHabitGroup } from './interfaces/habit-group.interface';
import { HabitTask } from './habit-task.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity(`habit_group`)
export class HabitGroup extends ManualAuditableBase implements IHabitGroup {
  @PrimaryColumn({ name: 'habit_group_id', type: 'bigint', comment: '习惯任务的主键id' })
  habitGroupId!: string;
  @Column({ name: 'habit_group_title', type: 'varchar', length: 255, nullable: false, comment: '分组标题' })
  habitGroupTitle!: string;
  @OneToMany(() => HabitTask, (habitTask) => habitTask.habitGroup)
  habitTasks?: HabitTask[];
}
