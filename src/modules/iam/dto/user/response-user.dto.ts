import { PartialType, OmitType } from '@nestjs/mapped-types';
import { User } from '@iam/entities/user.entity';
import { Expose } from 'class-transformer';
import { GenderEnum } from '@shared/enum/GenderEnum';
import { VipStatusEnum } from '@shared/enum/VipStatusEnum';
import { ResponseRoleDto } from '../role/response-role.dto';
/**
 * @description 更新用户信息的dto类  用户id不可更新 用于非修改密码的地后端逻辑
*/
export class ResponseUserDto {
  @Expose()
  userId !: bigint;

  @Expose()
  userEamil !: string;

  @Expose()
  userName !: string;

  @Expose()
  userGender !: GenderEnum;

  @Expose()
  userVipStatus !: VipStatusEnum;

  @Expose()
  userAvatar !: string;

  @Expose()
  userBirthday !: Date;

  @Expose()
  userSuperiorId !: bigint;

  @Expose()
  userSettingId !: bigint;

  @Expose()
  roles !: ResponseRoleDto[];  // 用户角色（如果有的话）
}