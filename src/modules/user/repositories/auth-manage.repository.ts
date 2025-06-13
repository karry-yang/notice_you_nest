import { Inject, Injectable } from '@nestjs/common';
import { IAuthManageRepository } from './interfaces/auth-manage.repository.interface';
import { CreateRoleDto } from '@user/dto/role/create-role.dto';
import { UpdateRoleDto } from '@user/dto/role/update-role.dto';
import { Role } from '@user/entities/role.entity';
import { DataSource, Repository } from 'typeorm';
import { Permission } from '@user/entities/permission.entity';
import { CreatePermissionDto } from '@user/dto/permission/create-permission.dto';
import { UpdatePermissionDto } from '@user/dto/permission/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermission } from '@user/entities/role-permission.entity';
import { User } from '@user/entities/user.entity';
import { RoleWithPermissionsDto } from 'src/common/dto/role-with-permissions.dto';

/**
 * @ description
 * 用户权限管理  用户一般通过id获取获取所有的角色和权限信息
 * 路由权限管理  通过查询组织或者部门 角色属性的权限和用户的权限匹配
 * 部门管理者 通过用户除了获取角色ADMIN-DEP:depId 权限还可以对部门内部用户的权限进行crud  操作的是:role_permission(role.rolePemission) where role_name=ADMIN-DEP/code=ADMIN-DEP:depid
 * 组织管理者  同部门管理者   但是范围不同
 * 系统管理者  对角色进行crud  ADMIN-SYS权限的crud
 */
@Injectable()
export class AuthManageRepository implements IAuthManageRepository {
  constructor(
    @InjectRepository(Role)
    private readonly roleRep: Repository<Role>,

    @InjectRepository(Permission)
    private readonly permisssionRep: Repository<Permission>,

    @InjectRepository(RolePermission)
    private readonly rolePermissionRepo: Repository<RolePermission>,

    private readonly dataSource: DataSource
  ) {}
  findPermisssionsByRoleId(rId: string): Promise<Permission[] | []> {
    throw new Error('Method not implemented.');
  }

  //通过角色id查询单个角色的全部信息包含权限
  async findRoleById(rid: string): Promise<Role | null> {
    const role = await this.dataSource
      .createQueryBuilder(Role, 'role')
      .leftJoinAndSelect('role.RolePermissions', 'rolePermission')
      .leftJoinAndSelect('rolePersmission.permission', 'permission')
      .where('role.roleId=:roleId', { roleId: rid })
      .andWhere('role.status=:status', { status: 1 }) //过滤条件  激活的
      .andWhere('permission.status=:status', { status: 1 }) //过滤条件
      .getOne();
    if (!role) return null;
    return role;
  }

  //通过角角色代码获取角色全部信息---unuse
  async findRoleByCode(rcode: string): Promise<Role | null> {
    const role = await this.dataSource
      .createQueryBuilder(Role, 'role')
      .leftJoinAndSelect('role.RolePermissions', 'rolePermission')
      .leftJoinAndSelect('rolePersmission.permission', 'permission')
      .where('role.role_code=:roleCode', { roleCode: rcode })
      .andWhere('role.status=:status', { status: 1 }) //过滤条件  激活的
      .andWhere('permission.status=:status', { status: 1 }) //过滤条件
      .getOne();
    if (!role) return null;
    return role;
  }

  //通过部门id获取全部的角色信息包含权限，用于验证权限是否属于该部门
  async findRolesByDepartmentId(depId: string): Promise<Role[] | []> {
    const role = await this.dataSource
      .createQueryBuilder(Role, 'role')
      .leftJoinAndSelect('role.rolePermissions', 'rolePermission')
      .leftJoinAndSelect('rolePermission.permission', 'permission')
      .where('rolePermission.departmentId=:departmentId', { departmentId: depId })
      .getMany();
    if (role.length <= 0) return [];
    return role;
  }
  //通过组织id获取全部的角色信息，用于验证权限是否属于该部门
  async findRolesByOraganizationId(orgId: string): Promise<Role[] | []> {
    const role = await this.dataSource
      .createQueryBuilder(Role, 'role')
      .leftJoinAndSelect('role.rolePermissions', 'rolePermission')
      .leftJoinAndSelect('rolePermission.permission', 'permission')
      .where('rolePermission.organizationId=:organizationId', { organizationId: orgId })
      .getMany();
    if (role.length <= 0) return [];
    return role;
  }

  //通过橘色id获取全部的权限数组  可考虑使用findRoleById简化代码
  async findPermissionsByRoleId(rId: string): Promise<Permission[]> {
    const role = await this.dataSource
      .createQueryBuilder(Role, 'role')
      .leftJoinAndSelect('role.rolePermissions', 'rolePermission')
      .leftJoinAndSelect('rolePermission.permission', 'permission')
      .where('role.role_id = :roleId', { roleId: rId })
      .getOne();

    if (!role?.rolePermissions) return [];

    return role.rolePermissions.map((rp) => rp.permission).filter((p) => p);
  }

  //通过权限id获取权限详情
  findPermissionById(perid: string): Promise<Permission | null> {
    throw new Error('Method not implemented.');
  }

  //查询部门中的权限
  async findPermissionsByDepartmentId(depId: string): Promise<Permission[] | []> {
    const permissions = await this.dataSource
      .createQueryBuilder(Permission, 'permission')
      .where('permission.permissionId=:permissionId', { departmentId: depId })
      .andWhere('permission.status=:status', { status: 1 })
      .getMany();
    return permissions;
  }
  findPermissionsByOraganizationId(orgId: string): Promise<Permission[] | []> {
    throw new Error('Method not implemented.');
  }

  //通过权限代码 查询权限完整信息
  async findPermissionByCode(percode: string): Promise<Permission | null> {
    throw new Error('Method not implemented.');
  }

  //通过用户id获取用户的角色和权限
  async findRolesAndPmermissiosByUserId(uId: string): Promise<RoleWithPermissionsDto[]> {
    const user = await this.dataSource
      .createQueryBuilder(User, 'user')
      .leftJoinAndSelect('user.userRoles', 'userRole') //关联用户角色
      .leftJoinAndSelect('userRole.role', 'role') //关联角色
      .leftJoinAndSelect('role.rolePermissions', 'rolePermission')
      .leftJoinAndSelect('rolePermission.permission', 'permission')
      .where('user.userId = :userId', { userId: uId })
      .andWhere('userRole.userId=:userId', { userId: uId })
      .andWhere('role.status=:status', { status: 1 }) //过滤条件  激活的
      .andWhere('permission.status=:status', { status: 1 }) //过滤条件
      .getOne();

    if (!user?.userRoles) return [];

    const roles: RoleWithPermissionsDto[] = [];

    for (const ur of user.userRoles) {
      const role = ur.role;
      if (!role) continue;


      //@todo少了
      const permissions = (role.rolePermissions || [])
        .map((rp) => rp.permission)
        .filter((p) => p)
        .map((p) => ({
          permissionId: p.permissionId,
          permissionCode: p.permissionCode,
          permissionType: p.permissionType,
          permissionRange: p.permissionRange,
          organizationId: p.organizationId?? '0',
          departmentId: p.departmentId??'0',
        }));

      roles.push({
        roleId: role.roleId,
        roleName: role.roleName,
        roleType: role.roleType,
        organizationId: ur.organizationId ?? '', // Add organizationId
        departmentId: ur.departmentId ?? '0',   // Add departmentId
        permissions,
      });
    }

    return roles;
  }

  findPermissionsByUserId(uId: string): Promise<Permission[] | []> {
    throw new Error('Method not implemented.');
  }
  createPermission(createPer: CreatePermissionDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  createRole(createrol: CreateRoleDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updatePermission(updatePer: UpdatePermissionDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateRole(updaterol: UpdateRoleDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteRole(rid: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deletePermission(perid: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
