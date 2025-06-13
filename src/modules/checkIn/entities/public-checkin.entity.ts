import { ManualAuditableBase } from 'src/common/shared/baseEntity/manualAuditable.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { IPublicCheckin } from './interfaces/public-checkin.interface';
import { TaskCheckinStatusEnum } from 'src/common/shared/enum/TaskCheckinStatusEnum';
import { PublicTask } from '@task/entities/public-task.entity';

@Entity(`public_checkin`)
export class PublicCheckin extends ManualAuditableBase implements IPublicCheckin {
  @PrimaryColumn({ name: 'checkin_id', type: 'bigint', comment: '打卡表主键id' })
  checkinId!: string;
  @Column({ name: 'checkin_time', type: 'timestamp', comment: '' })
  checkinTime!: Date;
  @Column({ name: 'checkin_log', type: 'varchar', length: '255', comment: '打卡的日志' })
  checkinLog!: string;
  @Column({ name: 'task_id', type: 'bigint', nullable: false, comment: '对应的任务id' })
  taskId!: string;
  @Column({ name: 'checkin_user_id', type: 'bigint', comment: '打卡用户id' })
  checkinUserId!: string;
  @Column({ name: 'checkin_status', type: 'enum', enum: TaskCheckinStatusEnum, comment: '打卡状态', default: TaskCheckinStatusEnum.UNCHECHIN })
  checkinStatus!: TaskCheckinStatusEnum;
  //应该加入组织部门 用户id
  @Column({name:'organization_id', type:'bigint', nullable:false, comment:'本记录归属的组织id'})
  organizationId!:string
  @Column({name:'department_id', type:'bigint', nullable:false, comment:'本记录归属的部门id'})
  departmentId!:string
  
  @ManyToOne(()=>PublicTask,(publicTask)=>publicTask.checkes)
  @JoinColumn({name:'taskId'})
  publicTask?:PublicTask
}
