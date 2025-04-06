import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'; //类属性验证库

/***
 * @description: 用户登录DTO
 * @param email 用户邮箱
 * @param password 用户密码
 *
 */
export class LoginUserDto  extends IUser{
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password!: string;
}
