import { ManualAuditableBase } from 'src/common/shared/baseEntity/manualAuditable.entity';
import { IPersonalTaskTag } from './interfaces/personal-task-tag.interface';
import { PersonalTask } from './personal-task.entity';
import { Tag } from './tag.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity(`personal_task_tag`)
export class PersonalTaskTag extends ManualAuditableBase implements IPersonalTaskTag {

  @PrimaryColumn({name:"personal_task_tag_id", type:'bigint', comment:'私有任务和标签关联主键'})
  personalTaskTagId!: string;
  @Column({name:'personal_task_id', type:'bigint',comment:'私有任务id'})
  personalTaskId!: string;
  @Column({name:'tag_id', type:'bigint', comment:'标签id'})
  tagId!: string;

  @ManyToOne(()=>PersonalTask,(personalTask)=>personalTask.personalTaskTags)
  @JoinColumn({name:'personalTaskId',referencedColumnName:'taskId'})
  personalTask !: PersonalTask;
  
  @ManyToOne(()=>Tag,(tag)=>tag.personalTaskTags)
  @JoinColumn({name:'tagId'})
  tag!: Tag;
}
