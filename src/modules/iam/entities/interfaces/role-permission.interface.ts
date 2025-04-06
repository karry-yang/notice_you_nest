import { Permission } from "@iam/entities/permission.entity";
import {Role} from "@iam/entities/role.entity";
import { IManualAuditableBase } from "@shared/baseInterface/manualAuditableBase.interface";
export interface IRolePermission extends IManualAuditableBase  {
  rolePermissionId: bigint; // 主键ID
  permission: Permission;
  role: Role;
}
