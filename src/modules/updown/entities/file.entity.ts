import { ManualAuditableBase } from 'src/common/shared/baseEntity/manualAuditable.entity';
import { ResourceTypeEnum } from 'src/common/shared/enum/ResourceTypeEnum';
import { IFile } from './interfaces/file.interface';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { PublicTask } from '@task/entities/public-task.entity';
import { PersonalTask } from '@task/entities/personal-task.entity';
import { HabitTask } from '@task/entities/habit-task.entity';
import { TaskTypeEnum } from 'src/common/shared/enum/TaskTypeEnum';

@Entity(`file`)
export class File extends ManualAuditableBase implements IFile {
    @PrimaryColumn({name:'file_id', type:'bigint', comment:'文件id'})
  fileId!: string;
  @Column({name:'file_name', type:'varchar', length:255, comment:'文件名字'})
  fileName!: string;
  @Column({name:'fiel_url', type:'varchar', length:255, comment:'文件保存地址'})
  fileUrl!: string;
  @Column({name:'file_type', type:'enum', enum:ResourceTypeEnum, nullable: false, comment:'文件类型'})
  fileType!: ResourceTypeEnum;
  @Column({name:'file_size', type:'int', comment:'文件大小'})
  fileSize!: number;
  
  @Column({name:'task_id', type:'bigint', nullable:true, comment:'对应的任务id'})
  @Index('indnx_file_task_id')
  taskId?: string;
  @Column({name:'task_type', type:'enum', enum:TaskTypeEnum,  comment:'对应的任务id'})
  taskType?: TaskTypeEnum;
//   @Column({name:'personal_task_id', type:'bigint', nullable:true, comment:'对应的个人任务id'})
//   personalTaskId?: string;
//   @Column({name:'public_task_id', type:'bigint', nullable:true,comment:'对应的公开任务'})
//   publicTaskId?: string;
//   @Column({name:'habit_task_id', type:'bigint', nullable:true,comment:'对应的习惯任务'})
//   habitTaskId?: string;


//   @ManyToOne(()=>PublicTask,(publicTask)=>publicTask.files)
//   @JoinColumn({name:'public_task_id'})
//   publicTask?:PublicTask

//   @ManyToOne(()=>PersonalTask,(personalTask)=>personalTask.files)
//   @JoinColumn({name:'public_task_id'})
//   personalTask?:PersonalTask

//   @ManyToOne(()=>HabitTask,(habitTask)=>habitTask.files)
//   @JoinColumn({name:'public_task_id'})
//   habitTask?:HabitTask
}
