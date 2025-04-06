import { ManualAuditableBase } from '@shared/baseEntity/manualAuditable.entity';
import { IUserRole } from './interfaces/user-role.interface';
import { User } from './user.entity';
import { Role } from './role.entity';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('user_role', { schema: 'iam' }) // 指定实体对应的数据库表名和模式
export class UserRole extends ManualAuditableBase implements IUserRole {
  @PrimaryColumn({ type: 'bigint', name: 'user_role_id' })
  userRoleId!: bigint; // 主键ID

  @ManyToMany(() => User, { eager: true, nullable: false })
  user!: User;

  @ManyToMany(() => Role, { eager: true, nullable: false })
  role!: Role;
}
