import { IManualAuditableBase } from "src/common/shared/baseInterface/manualAuditableBase.interface";
import { ResourceTypeEnum } from "src/common/shared/enum/ResourceTypeEnum";

export interface  IFile extends IManualAuditableBase{
    fileId:string
    fileName:string
    fileUrl:string
    fileType:ResourceTypeEnum
    fileSize: number
    personalTaskId?:string
    publicTaskId?:string
    habitTaskId?:string

}