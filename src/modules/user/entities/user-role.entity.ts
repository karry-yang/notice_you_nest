import { ManualAuditableBase } from 'src/common/shared/baseEntity/manualAuditable.entity';
import { IUserRole } from './interfaces/user-role.interface';
import { User } from './user.entity';
import { Role } from './role.entity';
import {

  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  Column,
} from 'typeorm';

@Entity('user_role', { schema: 'iam' })
export class UserRole extends ManualAuditableBase implements IUserRole {
  // 雪花 ID 或手动生成的主键
  @PrimaryColumn({ type: 'bigint', name: 'user_role_id' })
  userRoleId!: string;

  @Column({name:'user_id', type:'bigint',nullable:false,comment:'外键用户id'})
  userId!:string

  @Column({name:'role_id', type:'bigint',nullable:false,comment:'外键角色id'})
  roleId!:string
  //
  @ManyToOne(() => User, { eager: true, nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Role, { eager: true, nullable: false })
  @JoinColumn({ name: 'role_id' }) 
  role!: Role;
 
  //0->没有  1->所有
  @Column({ type: 'bigint', name: 'department_id', default:0, nullable: false, comment: ' 部门ID, 可外键关联' })
  departmentId?: string; // 部门ID, 可能是外键关联

  @Column({ type: 'bigint', name: 'organization_id', default:0, nullable: false, comment: ' 组织ID, 外键关联' })
  organizationId?: string; // 组织ID, 可能是外键关联
}
