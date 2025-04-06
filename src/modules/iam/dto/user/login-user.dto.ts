import { PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'; //类属性验证库
import { User } from '@iam/entities/user.entity';
/***
 * @description: 用户登录DTO
 * @param email 用户邮箱
 * @param password 用户密码
 *
 */
export class LoginUserDto extends PickType(User, ['userEamil', 'userPassword'] as const) {
  @IsNotEmpty()
  @IsEmail()
  userEamil!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  userPassword!: string;
}
