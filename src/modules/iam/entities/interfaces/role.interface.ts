import { IManualAuditableBase } from "@shared/baseInterface/manualAuditableBase.interface";
import { IRolePermission } from "@iam/entities/interfaces/role-permission.interface";
import { IUserRole } from "@iam/entities/interfaces/user-role.interface";
export interface IRole  extends IManualAuditableBase{
  roleId: bigint;
  roleName: string;
  roleDescription: string;
  roleCode: string;
  rolePermissions?: IRolePermission[];
  roleUsers?: IUserRole[];
}
