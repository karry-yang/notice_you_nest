import { IPermission } from "@iam/entities//interfaces/permission.interface";
import {IRole} from "@iam/entities/interfaces/role.interface";
import { IManualAuditableBase } from "@shared/baseInterface/manualAuditableBase.interface";
export interface IRolePermission extends IManualAuditableBase  {
  rolePermissionId: bigint; // 主键ID
  permission: IPermission;
  role: IRole;
}
