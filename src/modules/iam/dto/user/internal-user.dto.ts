import { GenderEnum } from '@shared/enum/GenderEnum';
import { VipStatusEnum } from '@shared/enum/VipStatusEnum';
import { InternalRoleDto } from '@iam/dto/role/internal-role.dto';
import { Exclude, Expose } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
import { IuserBase } from '@iam/entities/interfaces/user.interface';
/**
 * @description   系统内部的用户信息  包含加密密码
 * 
*/

export class InternalUserDto  {

    //id
    @Expose()
    userId !: bigint;
  
    //邮箱
    @Expose()
    userEamil !: string;
  
    //密码
    @Exclude()  // 密码字段不返回
    userPassword !: string;  // 密码字段
  

    //盐
    @Exclude()  // 盐值字段不返回
    userSalt !: string;  // 密码盐值字段
  
    //名字
    @Expose()
    userName !: string;
  

    //性别
    @Expose()
    userGender!: GenderEnum;
  

    //vip状态
    @Expose()
    userVipStatus !: VipStatusEnum;
  

    //头像地址
    @Expose()
    userAvatar !: string;
  

    //生日
    @Expose()
    userBirthday !: Date;
  

    //上级id
    @Expose()
    userSuperiorId !: bigint |null;
  
    //
    @Expose()
    userSettingId !: bigint;
  
    @Expose()
    roles !: InternalRoleDto[];  // 角色信息，内部使用

}