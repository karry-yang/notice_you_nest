import { Permission } from "../permission.entity";
import { Role } from "../role.entity";
import { IManualAuditableBase } from "src/common/shared/baseInterface/manualAuditableBase.interface";
export interface IRolePermission extends IManualAuditableBase  {
  rolePermissionId: string; // 主键ID
  permission: Permission;
  role: Role;
}
