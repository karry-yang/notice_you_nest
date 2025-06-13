import { IManualAuditableBase } from "src/common/shared/baseInterface/manualAuditableBase.interface";
import { PersonalTask } from "../personal-task.entity";
import { Tag } from "../tag.entity";

export interface IPersonalTaskTag extends IManualAuditableBase{
    personalTaskTagId:string
    personalTaskId:string
    tagId:string
    personalTask:PersonalTask
    tag:Tag
}