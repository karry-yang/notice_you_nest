import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConnectUserDto } from '@user/dto/user/connect-user.dto';
import { Expose, Transform, Type } from 'class-transformer';
import { IsString, IsOptional } from 'class-validator';

export class ResponseDepartmentDto {
  @ApiProperty({ 
    type: String, 
    description: '部门ID', 
    example: '1234567890' 
  })
  @Expose()
  @Transform(({ value }) => value?.toString()) // BigInt 转字符串
  departmentId!: bigint;

  @ApiProperty({ 
    description: '部门名称', 
    example: '技术研发部' 
  })
  @Expose()
  @IsString()
  departmentName!: string;

  @ApiPropertyOptional({ 
    description: '部门描述', 
    example: '负责核心技术研发与创新',
    nullable: true 
  })
  @Expose()
  @IsOptional()
  @IsString()
  departmentDescription?: string | null;

  @ApiPropertyOptional({ 
    type: String, 
    description: '部门负责人ID', 
    example: '9876543210',
    nullable: true 
  })
  @Expose()
  @Transform(({ value }) => value?.toString()) // BigInt 转字符串
  @IsOptional()
  departmentLeaderId?: bigint | null;

  @ApiPropertyOptional({ 
    type: ConnectUserDto, 
    description: '部门负责人详细信息' 
  })
  @Expose()
  @Type(() => ConnectUserDto) // 嵌套 DTO 转换
  @IsOptional()
  departmentLeader?: ConnectUserDto | null;

  // ========== 可选扩展字段 ==========
  @ApiPropertyOptional({
    description: '部门状态',
    example: 'active'
  })
  @Expose()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({
    type: String,
    description: '部门编码',
    example: 'DEPT_DEV'
  })
  @Expose()
  @IsOptional()
  @IsString()
  departmentCode?: string;
}