import { ManualAuditableBase } from 'src/common/shared/baseEntity/manualAuditable.entity';
import { Permission } from './permission.entity';
import { Role } from './role.entity';
import { IRolePermission } from './interfaces/role-permission.interface';
import { Entity, ManyToOne, PrimaryColumn ,Column, JoinColumn} from 'typeorm';

/**
 * @description 角色和权限的关联类型
 * 使用组织id  部门id  去决定权限的作用范围
*/
@Entity('role_permission', { schema: 'iam' }) // 指定实体对应的数据库表名和模式
export class RolePermission extends ManualAuditableBase implements IRolePermission {
  @PrimaryColumn({ type: 'bigint', name: 'role_permission_id' })
  rolePermissionId!: string;

  @ManyToOne(() => Permission, { eager: true, nullable: false })
  @JoinColumn({name:"permission_id"})
  permission!: Permission;

  @ManyToOne(() => Role, { eager: true, nullable: false })
  @JoinColumn({name:"role_id"})
  role!: Role;

  //范围属性
 
  @Column({name:"organization_id", type:"bigint", nullable:true})
  organizationId?: bigint;
  
  @Column({name:"department_id", type:"bigint", nullable:true})
  departmentId?: bigint;
}
