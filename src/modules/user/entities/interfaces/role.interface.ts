import { IManualAuditableBase } from "src/common/shared/baseInterface/manualAuditableBase.interface";
import { IRolePermission } from "@user/entities/interfaces/role-permission.interface";
import { IUserRole } from "@user/entities/interfaces/user-role.interface";
import { RoleTypeEnum } from "@shared/enum/RoleTypeEnum";
export interface IRole  extends IManualAuditableBase{
  roleId: string;
  roleName: string;
  roleDescription: string;
  roleType: RoleTypeEnum;
  rolePermissions?: IRolePermission[];
  roleUsers?: IUserRole[];
  // departmntId?: string; // 部门ID, 可能是外键关联
  // organizationId?: string; // 组织ID, 可能是外键关联
}
