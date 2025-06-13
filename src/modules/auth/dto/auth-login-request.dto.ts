import { ApiProperty} from '@nestjs/swagger';
import { LoginDto } from './login.dto';

export class AuthLoginRequestDto {
  @ApiProperty({ required: false, type: LoginDto, description: '账号密码登录信息' })
  loginDto?: LoginDto;

  @ApiProperty({ required: false, description: '刷新 token，用于自动登录' })
  refreshToken?: string;
}
