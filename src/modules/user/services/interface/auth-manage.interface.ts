import { CreateRoleDto } from '@user/dto/role/create-role.dto';
import { Role } from '@user/entities/role.entity';
import { RoleWithPermissionsDto } from 'src/common/dto/role-with-permissions.dto';

export interface IAuthManageService {
  /**
   * @description  通过id获取用户的角色权限列表
   */
  findUserAuth(userId: string): Promise<RoleWithPermissionsDto[]>;

  /**
   * @description  系统管理创建系统角色  系统管理员才可以创建角色   组织管理操作的是用户角色关联表
   * 默认type=ASMIN-SYS
   * 操作的是role
   *
   */

//   createSysRole(newRole: CreateRoleDto): Promise<Role | null>;


//   //组织管理者创建角色  操作的是userRole
//   createOrgRole(newUserRole:)
}
