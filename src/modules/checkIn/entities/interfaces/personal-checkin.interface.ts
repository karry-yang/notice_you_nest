import { IManualAuditableBase } from "src/common/shared/baseInterface/manualAuditableBase.interface";
import { TaskCheckinStatusEnum } from "src/common/shared/enum/TaskCheckinStatusEnum";



export interface IPersonalCheckin extends IManualAuditableBase{
      checkinId:string
      checkinTime:Date
      checkinLog:string
      checkinTaskId:string;
      // checkinUserId:string
      checkinStatus:TaskCheckinStatusEnum
  
}