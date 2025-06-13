import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { GenderEnum } from 'src/common/shared/enum/GenderEnum';
export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: '用户邮箱', required: true, type: 'string' })
  userEmail!: string;
  @ApiProperty({ example: 'karry', description: '用户名字', required: true, type: 'string' })
  userName!: string;
  @ApiProperty({ example: '123456', description: '用户密码', required: true, type: 'string' })
  userPassword!: string;
  @ApiProperty({ example: '18711970901', description: '用户手机号', required: true, type: 'string' })
  userPhone!: string;
  @ApiProperty({
    enum: GenderEnum,
    description: '用户性别',
    example: GenderEnum.MALE, // 或 'MALE'
  })
  @IsEnum(GenderEnum, { message: '性别必须是 MALE 或 FEMALE' })
  userGender!:GenderEnum;
  @ApiProperty({ example: 'abcd-dsssbs', description: '组织代码', required: false, type: 'string' })
  organizationCode?: string;
  @ApiProperty({ example: '234567', description: '邮箱验证码', required: true, type: 'string' })
  captcha!: string;
}
