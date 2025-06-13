import { ManualAuditableBase } from "src/common/shared/baseEntity/manualAuditable.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { IPersonalCheckin } from "./interfaces/personal-checkin.interface";
import { TaskCheckinStatusEnum } from "src/common/shared/enum/TaskCheckinStatusEnum";
import { PersonalTask } from "@task/entities/personal-task.entity";

@Entity(`personal_checkin`)
export class PersonalCheckin extends ManualAuditableBase implements IPersonalCheckin{
    @PrimaryColumn({name:'checkin_id', type:'bigint', comment:'打卡表主键id'})
    checkinId!:string
    @Column({name:'checkin_time',type:'timestamp', comment:''})
    checkinTime!:Date
    @Column({name:'checkin_log',type:'varchar', length:'255', comment:'打卡的日志'})
    checkinLog!:string
    @Column({name:'checkin_task_id', type:'bigint', nullable:false, comment:'对应的公开任务id'})
    checkinTaskId!:string;
    // @Column({name:'checkin_user_id', type:'bigint', comment:'打卡用户id'})
    // checkinUserId!:string
    @Column({name:'checkin_status', type:'enum',  enum:TaskCheckinStatusEnum,comment:'打卡状态', default:TaskCheckinStatusEnum.UNCHECHIN})
    checkinStatus!:TaskCheckinStatusEnum
    //多对一
    @ManyToOne(()=>PersonalTask,(personalTask)=>personalTask.checkes)
    personalTask?:PersonalTask
    
}