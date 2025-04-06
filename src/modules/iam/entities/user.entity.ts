import { ManualAuditableBase } from '@shared/baseEntity/manualAuditable.entity';
import { Column, Entity, PrimaryColumn,OneToMany } from 'typeorm';
import { IuserBase } from '@iam/entities/interfaces/user.interface';
import { GenderEnum } from '@shared/enum/GenderEnum';
import { VipStatusEnum } from '@shared/enum/VipStatusEnum';
import { UserRole } from './user-role.entity'; // 引入用户角色关联实体
/**
 * @description  iam 权限验证模块的用户类
 * @param userId 用户id
 * @param userEamil 用户邮箱
 * @param userPhone 手机号码
 * @param userPassword 用户密码
 * @param userSalt 用户密码盐值
 * @param userName 用户名字
 * @param userGender 性别
 * @param userBirthday 用户生日
 * @param userAvatar 用户头像地址
 * @param userSuperiorId  用户上级id
 * @param userVipStatus 用户vip状态
 * @param userSettingId  用户设置表id
 */
@Entity(`sys_user`)
export class User extends ManualAuditableBase implements IuserBase {
  @PrimaryColumn({ name: 'user_id', type: 'bigint', comment: '用户id' })
  userId!: bigint;

  @Column({ name: 'user_email', type: 'varchar', length: 50, unique: true, comment: '用户邮箱' })
  userEamil!: string;

  @Column({ name: 'user_phone', type: 'varchar', length: 11, unique: true, comment: '用户手机号码' })
  userPhone!: string;

  @Column({ name: 'user_password', type: 'varchar', length: 128, select: false, comment: '用户hash密码' })
  userPassword!: string;

  @Column({ name: 'user_salt', type: 'varchar', length: 64, select: false, comment: '用户密码盐值' })
  userSalt!: string;

  @Column({ name: 'user_name', type: 'varchar', length: 50, comment: '用户名字' })
  userName!: string;

  @Column({ name: 'user_gender', type: 'enum', enum: GenderEnum, default: GenderEnum.FEMALE, comment: '性别' })
  userGender!: GenderEnum;

  @Column({ name: 'user_birthday', type: 'date', nullable: true, comment: '用户生日' })
  userBirthday!: Date;

  @Column({ name: 'user_avatar', type: 'varchar', length: 255, comment: '用户头像地址' })
  userAvatar!: string;

  @Column({ name: 'user_superior_id', type: 'bigint', comment: '用户上级id' })
  userSuperiorId!: bigint;

  @Column({ name: 'user_vip_status', type: 'enum', enum: VipStatusEnum, default: VipStatusEnum.UNVIP, comment: '用户vip状态' })
  userVipStatus!: VipStatusEnum;

  @Column({ name: 'user_setting_id', type: 'bigint', comment: '用户设置表id' })
  userSettingId!: bigint;

  @OneToMany(() => UserRole, rolePermission => rolePermission.user, {  nullable: true })
  userRoles ?: UserRole[];
}
