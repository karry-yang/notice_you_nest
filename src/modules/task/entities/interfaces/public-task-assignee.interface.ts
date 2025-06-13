import { IManualAuditableBase } from "src/common/shared/baseInterface/manualAuditableBase.interface";
import { ReadStatus } from "src/common/shared/enum/ReadStatus";
import { PublicTask } from "../public-task.entity";
import { User } from "@user/entities/user.entity";




export interface IPublicTaskAssignee extends IManualAuditableBase {
  publicTaskAssingeeId: string;

  publicTaskId: string;

  assigneeId: string;

  publicTask?: PublicTask;

  assingee?: User[];

  isRead:ReadStatus

}
