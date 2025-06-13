import { ManualAuditableBase } from "src/common/shared/baseEntity/manualAuditable.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { PublicTask } from "./public-task.entity";
import { User } from "@user/entities/user.entity";
import { IPublicTaskRector } from "./interfaces/public-task-rector.interface";


//任务的负责人关联表   一个公开任务有多个负责人
@Entity(`public_task_cretor` )
export class PublicTaskRector extends ManualAuditableBase implements IPublicTaskRector{

    @PrimaryColumn({name:'public_task_rector_id', type:'bigint',comment:'公开任务和负责人之间的关联表id'})
    publicTaskCretorId !:string
    @Column({name:'public_task_id', type:'bigint',  nullable:false, comment:'对应的公开任务id'})
    publicTaskId !:string;
    @Column({name:'rector_id', type:'bigint',  nullable:false, comment:'对应的用户id'})
    rectorId !:string;

    @ManyToOne(()=>PublicTask,(publicTask)=>publicTask.rector)
    @JoinColumn({name:'publicTaskId',referencedColumnName:'taskId'})
    publicTask?:PublicTask
    @ManyToOne(()=>User)
    rector?:User

}