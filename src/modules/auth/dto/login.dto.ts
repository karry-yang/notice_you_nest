
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: '用户邮箱' , required:true,  type:"string" })
  userEmail!: string;

  @ApiProperty({ example: 'password123', description: '用户密码', required:true,  type:"string"  })
  password !: string;
}
