import { ManualAuditableBase } from 'src/common/shared/baseEntity/manualAuditable.entity';
import { Column, Entity, PrimaryColumn, OneToMany, OneToOne, JoinColumn, ManyToOne, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IuserBase } from '@user/entities/interfaces/user.interface';
import { GenderEnum } from 'src/common/shared/enum/GenderEnum';
import { VipStatusEnum } from 'src/common/shared/enum/VipStatusEnum';
import { UserRole } from './user-role.entity'; // 引入用户角色关联实体
import { Organization } from './organization.entity';
import { Department } from './department.entity';
import { UserSetting } from './user-setting.entity';
/**
 * @description  user 权限验证模块的用户类
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
@Entity(`user`)
export class User extends ManualAuditableBase implements IuserBase {
  @PrimaryColumn({ name: 'user_id', type: 'bigint', comment: '用户id' })
  userId!: string;

  @Column({ name: 'user_email', type: 'varchar', length: 50, unique: true, comment: '用户邮箱' })
  userEmail!: string;

  @Column({ name: 'user_phone', type: 'varchar', length: 18, unique: true, comment: '用户手机号码' })
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

  @Column({ name: 'user_avatar', type: 'varchar', length: 255, comment: '用户头像地址', nullable:true })
  userAvatar!: string;

  @Column({ name: 'user_vip_status', type: 'enum', enum: VipStatusEnum, default: VipStatusEnum.UNVIP, comment: '用户vip状态' })
  userVipStatus!: VipStatusEnum;

  @OneToMany(() => UserRole, (userRole) => userRole.user, { nullable: true })
  userRoles?: UserRole[];

  //上级id
  // @Column({ name: 'superior_id', type: 'bigint', comment: '用户上级id', nullable:true })
  // superiorId!: string;

  @Column({ name: 'superior_id', type: 'bigint', nullable: true, comment: '用户上级id' })
  superiorId?: string;
  
  @ManyToOne(() => User, {
    lazy: true,
    nullable: true,
  })
  @JoinColumn({ name: 'superior_id' })
  Superior?: Promise<User | null>;
  
  @Column({ name: 'organization_id', type: 'bigint', nullable: true })
  organizationId?: string;
  
  //组织信息
  @ManyToOne(() => Organization, { lazy: true, nullable: true })
  @JoinColumn({ name: 'organization_id' })  // 指定外键列名为 organization_id
  organization?: Promise<Organization | null>;
  
  @Column({ name: 'department_id', type: 'bigint', nullable: true })
  departmentId?: string;
  
  @ManyToOne(() => Department, { lazy: true, nullable: true })
  @JoinColumn({ name: 'department_id' })  // 指定外键列名为 department_id
  department?: Promise<Department | null>;
  
  // @Column({ name: 'user_setting_id', type: 'bigint', comment: '用户设置表id', nullable: true  })
  // userSettingId!: string;
  
  // @OneToOne(() => UserSetting, {
  //   lazy: true,
  //   nullable: false,
  //   eager: false,
  //   cascade: true,
  //   onDelete: 'SET NULL',
  // })
  //不设置外键  仅仅使用和userid一致的id
  // @JoinColumn({ name: 'user_setting_id', referencedColumnName: 'userSettingId' })
  // userSetting?: Promise<UserSetting | null>;
  

  // @BeforeInsert()
  // async hashPassword() {
  //   // 生成一个独特的盐值
  //   this.userSalt = await bcrypt.genSalt(10); // 生成盐值，适当的盐复杂度
  //   this.userPassword = await bcrypt.hash(this.userPassword + this.userSalt, 10);  // 使用盐值进行加密
  // }

  // // 验证密码
  // async comparePassword(inputPassword: string): Promise<boolean> {
  //   console.log("inputPassword",inputPassword)
  //   const hashedInputPassword = await bcrypt.hash(inputPassword + this.userSalt, 10); // 用保存的盐进行加密
  //   console.log("hashedInputPassword:",hashedInputPassword)
  //   return this.userPassword === hashedInputPassword;  // 比较数据库中存储的密码和输入的密码是否一致
  // }
}
