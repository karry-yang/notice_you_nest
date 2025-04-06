import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'; //类属性验证库

/***
 * @description: 用户注册DTO
 * @param username 用户名
 * @param email 用户邮箱
 * @param password 用户密码
 * @param phone 用户手机号
 *
 */
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(11)
  phone!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password!: string;
}
