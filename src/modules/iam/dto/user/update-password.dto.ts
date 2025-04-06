import { IsString, MinLength, MaxLength, IsNotEmpty, Matches, IsNumberString } from 'class-validator';

export class ChangePasswordDto {
  @IsNumberString()
  @IsNotEmpty()
  userId !: bigint;  // 用户 ID，用来标识用户

  @IsString()
  @MinLength(6)
  @MaxLength(128)
  @IsNotEmpty()
  oldPassword !: string;  // 原密码

  @IsString()
  @MinLength(6)
  @MaxLength(128)
  @IsNotEmpty()
  newPassword !: string;  // 新密码

  @IsString()
  @MinLength(6)
  @MaxLength(128)
  @IsNotEmpty()
  confirmPassword !: string;  // 确认密码，确保与新密码一致
}
