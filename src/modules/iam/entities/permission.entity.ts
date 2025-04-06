import { ManualAuditableBase } from '@shared/baseEntity/manualAuditable.entity';
import { IPermission } from './interfaces/permission.interface';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PermissionTypeEnum } from '@shared/enum/PermissionTypeEnum';
import { Role } from './role.entity';
import { RolePermission } from './role-permission.entity';

@Entity('permission', { schema: 'iam' })
export class Permission extends ManualAuditableBase implements IPermission {
  @PrimaryColumn({ type: 'bigint', name: 'permission_id' })
  permissionId!: bigint;

  @Column({ type: 'varchar', length: 100, nullable: false })
  permissionName!: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  permissionDescription: string = '';

  @Column({ type: 'varchar', length: 50, unique: true })
  permissionCode!: string;

  @Column({
    type: 'enum',
    enum: PermissionTypeEnum,
    default: PermissionTypeEnum.ACTION,
  })
  permissionType!: PermissionTypeEnum;

  @OneToMany(() => RolePermission, (rp) => rp.permission)
  rolePermissions?: RolePermission[];
}