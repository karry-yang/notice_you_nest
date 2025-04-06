import { Role } from "@iam/entities/role.entity"; 
import { User } from "@iam/entities/user.entity";
import { IManualAuditableBase } from "@shared/baseInterface/manualAuditableBase.interface";
export interface IUserRole extends IManualAuditableBase {
  userRoleId: bigint; // 主键ID
  user:User; // 用户实体
  role:Role; // 角色实体
}