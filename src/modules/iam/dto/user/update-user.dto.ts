import { IsString, IsEmail, MinLength, MaxLength, IsOptional ,IsEnum} from 'class-validator';
import { GenderEnum } from '@shared/enum/GenderEnum';
import { VipStatusEnum } from '@shared/enum/VipStatusEnum';

/**
 * @description 更新用户信息的dto类  用户id不可更新 用于非修改密码的地后端逻辑
*/
export class updteUserDto {
  @IsEmail()
  @IsOptional()
  userEamil?: string;  // 用户邮箱

  // @IsString()
  // @MinLength(6)
  // @MaxLength(128)
  // @IsOptional()
  // userPassword?: string;  // 用户密码（可选）

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsOptional()
  userName?: string;  // 用户名称（可选）

  @IsEnum(GenderEnum)
  @IsOptional()
  userGender?: GenderEnum;  // 性别（可选）

  @IsEnum(VipStatusEnum)
  @IsOptional()
  userVipStatus?: VipStatusEnum;  // VIP状态（可选）
}