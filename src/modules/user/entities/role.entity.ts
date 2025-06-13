import { ManualAuditableBase } from 'src/common/shared/baseEntity/manualAuditable.entity';
import { IRole } from './interfaces/role.interface';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RolePermission } from './role-permission.entity';
import { RoleTypeEnum } from '@shared/enum/RoleTypeEnum';

/**
 * @description 角色ID
 * @param {string} roleId 角色ID
 * @param {string} roleName 角色名称
 * @param {string} roleDescription 角色描述
 * @param {enum} roleType 角色类型
 */
@Entity('role')
export class Role extends ManualAuditableBase implements IRole {
  @PrimaryColumn({ type: 'bigint', name: 'role_id' })
  roleId!: string;

  @Column({ type: 'varchar', name: 'role_name', length: 50 })
  roleName!: string;

  @Column({ type: 'varchar', name: 'role_description', length: 255 })
  roleDescription: string = '';

  //代码统一使用roletype：orgId:depId,不明确表达
  // @Column({ type: 'varchar', name: 'role_code', length: 50, nullable: false })
  // roleCode!: string;


  @Column({name:'role_type',type:'enum', enum:RoleTypeEnum,default:RoleTypeEnum.GUEST})
  roleType!:RoleTypeEnum
  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role, { nullable: true })
  rolePermissions?: RolePermission[];

}
