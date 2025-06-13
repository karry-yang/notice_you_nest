import { CreatePermissionDto } from '@user/dto/permission/create-permission.dto';
import { UpdatePermissionDto } from '@user/dto/permission/update-permission.dto';
import { CreateRoleDto } from '@user/dto/role/create-role.dto';
import { RoleWithPermissionsDto } from 'src/common/dto/role-with-permissions.dto';
import { UpdateRoleDto } from '@user/dto/role/update-role.dto';
import { Permission } from '@user/entities/permission.entity';
import { Role } from '@user/entities/role.entity';

/**
 * @description 角色持久化操作接口角色查询
 * @interface    findById(rid: string): Promise<Role | null>; //id查询
 * @interface   findByRoleId(rId: string): Promise<Role[] | []>; //roleId查询
 * @interface  indByDepartmentId(depId: string): Promise<Role[] | []>; //departmentId查询
 * @interface   findByOraganizationId(orgId: string): Promise<Role[] | []>; //organizatonId查询
 * @interface    findByUserId(uId: string): Promise<Role[] | []>; //userId查询
 * @interface  createRole(createrol: CreateRoleDto): Promise<void>; //创建新的权限
 * @interface    updateRole(updaterol: UpdateRoleDto):Promise<void>;
 */
export interface IAuthManageRepository {
  //角色


  //id查询角色
  findRoleById(rid: string): Promise<Role | null>; //id查询
  //角色代码查询角色
  findRoleByCode(rcode: string): Promise<Role | null>; //RoleCode查询

  //组织部门内部查询角色列表

  findRolesByDepartmentId(depId: string): Promise<Role[] | []>; //departmentId查询
  findRolesByOraganizationId(orgId: string): Promise<Role[] | []>; //organizatonId查询
  //通过角色id查询权限列表
  findPermisssionsByRoleId(rId: string): Promise<Permission[] | []>; //roleId查询



  //权限

  //通过id查询权限
  findPermissionById(perid: string): Promise<Permission | null>; //id查询



  //通过组织部门id查询权限列表  操作的role-permission表
  findPermissionsByDepartmentId(depId: string): Promise<Permission[] | []>; //departmentId查询
  findPermissionsByOraganizationId(orgId: string): Promise<Permission[] | []>; //organizatonId查询
  //通过权限代码查询权限
  findPermissionByCode(percode: string): Promise<Permission | null>; //permissionCode查询

  // 用户
  //通过用户id查询用户角色关联表获取用户具备的角色和角色具备的权限
  findRolesAndPmermissiosByUserId(uId: string): Promise<RoleWithPermissionsDto[]>; //roleId查询



  //通过用户id查询用户具备的权限列表
  findPermissionsByUserId(uId: string): Promise<Permission[] | []>; //userId查询



  // ============创建=============
  createPermission(createPer: CreatePermissionDto): Promise<void>; //创建新的权限
  
  createRole(createrol: CreateRoleDto): Promise<void>; //创建新的权限

  // ============修改=============
  updatePermission(updatePer: UpdatePermissionDto): Promise<void>;
  updateRole(updaterol: UpdateRoleDto): Promise<void>;

  //删除
  deleteRole(rid: string): Promise<void>; //删除角色
  deletePermission(perid: string): Promise<void>; //删除权限
}
