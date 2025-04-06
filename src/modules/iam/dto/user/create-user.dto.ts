import { GenderEnum } from '@shared/enum/GenderEnum';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, min, max, MaxLength, Length, IsPhoneNumber ,Matches} from 'class-validator'; //类属性验证库

/***
 * @description: 用户注册DTO  
 * @param username 用户名
 * @param email 用户邮箱
 * @param password 用户密码
 * @param phone 用户手机号
 *
 */
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  userEamil!: string;  // 用户邮箱

  @IsPhoneNumber()
  @Matches(/^\d+$/, { message: 'userId must be a valid bigint' }) // 验证是否是纯数字
  userPhone !: string

  @IsString()
  @Length(6, 18)
  @IsNotEmpty()
  userPassword!: string;  // 用户密码

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  userName !: string;  // 用户名称

  @IsEnum(GenderEnum)
  userGender: GenderEnum = GenderEnum.FEMALE;  // 性别


}
