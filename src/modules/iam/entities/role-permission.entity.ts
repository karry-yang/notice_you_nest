import { ManualAuditableBase } from '@shared/baseEntity/manualAuditable.entity';
import { Permission } from './permission.entity';
import { Role } from './role.entity';
import { IRolePermission } from './interfaces/role-permission.interface';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
@Entity('role_permission', { schema: 'iam' }) // 指定实体对应的数据库表名和模式
export class RolePermission extends ManualAuditableBase implements IRolePermission {
  @PrimaryColumn({ type: 'bigint', name: 'role_permission_id' })
  rolePermissionId!: bigint;

  @ManyToOne(() => Permission, { eager: true, nullable: false })
  permission!: Permission;

  @ManyToOne(() => Role, { eager: true, nullable: false })
  role!: Role;
}
