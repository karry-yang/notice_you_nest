import { ManualAuditableBase } from '@shared/baseEntity/manualAuditable.entity';
import { IRole } from './interfaces/role.interface';
import { Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * @description 角色ID
 * @param {bigint} roleId 角色ID
 * @param {string} roleName 角色名称
 * @param {string} roleDescription 角色描述
 * @param {string} roleCode 角色编码
 */
@Entity('role')
export class Role extends ManualAuditableBase implements IRole {
  @PrimaryColumn({ type: 'bigint', name: 'role_id' })
  roleId!: bigint;

  @Column({ type: 'varchar', name: 'role_name', length: 50 })
  roleName!: string;

  @Column({ type: 'varchar', name: 'role_description', length: 255 })
  roleDescription: string = '';

  @Column({ type: 'varchar', name: 'role_code', length: 50, nullable: false })
  roleCode!: string;
}
