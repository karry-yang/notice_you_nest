import { IRole } from "@iam/entities/interfaces/role.interface"; 
import { IuserBase } from "@iam/entities/interfaces/user.interface";
import { IManualAuditableBase } from "@shared/baseInterface/manualAuditableBase.interface";
export interface IUserRole extends IManualAuditableBase {
  userRoleId: bigint; // 主键ID
  user:IuserBase; // 用户实体
  role:IRole; // 角色实体
}