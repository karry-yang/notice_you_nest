import { ManualAuditableBase } from 'src/common/shared/baseEntity/manualAuditable.entity';
import { IPermission } from './interfaces/permission.interface';
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { PermissionTypeEnum } from 'src/common/shared/enum/PermissionTypeEnum';
import { Role } from './role.entity';
import { RolePermission } from './role-permission.entity';
import { PermissionRangeEnum } from '@shared/enum/PermissionRangeEnum';

@Entity('permission', { schema: 'iam' })
export class Permission extends ManualAuditableBase implements IPermission {
  @PrimaryColumn({ type: 'bigint', name: 'permission_id' })
  permissionId!: string;

  @Column({ name: 'permission_name', type: 'varchar', length: 100, nullable: false })
  permissionName!: string;

  // @Column({ name: 'permission_description', type: 'varchar', length: 200, nullable: true })
  // permissionDescription: string = '';

  @Column({ name: 'permission_code', type: 'varchar', length: 50, unique: true })
  permissionCode!: string;

  @Column({
    name: 'permission_type',
    type: 'enum',
    enum: PermissionTypeEnum,
  })
  permissionType!: PermissionTypeEnum;
  @Column({
    name: 'permission_range',
    type: 'enum',
    enum: PermissionRangeEnum,
  })
  permissionRange!: PermissionRangeEnum;

  @Column({ name: 'department_id', type: 'varchar', length: 64, nullable: true })
  departmentId?: string;

  @Column({ name: 'organization_id', type: 'varchar', length: 64, nullable: true })
  organizationId?: string;
  @Column({ name: 'description', type: 'varchar', length: 255, nullable: true })
  description?: string;

  @OneToMany(() => RolePermission, (rp) => rp.permission)
  rolePermissions?: RolePermission[];

  @Column({name:"permission_priority", type:'int',  nullable:false})
  permissionPriority!: number
}
