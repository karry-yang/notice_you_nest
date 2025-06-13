import { IManualAuditableBase } from 'src/common/shared/baseInterface/manualAuditableBase.interface';
import { User } from '../user.entity';
import { Role } from '../role.entity';
export interface IUserRole extends IManualAuditableBase {
  userRoleId: string; // 主键ID
  userId: string;
  roleId: string;
  organizationId?:string,
  departmentId?:string,
  user: User; // 用户实体
  role: Role; // 角色实体
}
