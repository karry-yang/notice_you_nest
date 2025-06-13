import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StatusEnum } from '@shared/enum/RowStatusEnum';
import { Transform } from 'class-transformer';
import { 
  IsString, 
  IsOptional, 
  IsEnum, 
  Length, 
  Matches,
  IsNumberString,
  IsDateString
} from 'class-validator';

export class InternalDepartmentDto {
  // ========== 核心字段 ==========
  @ApiProperty({ type: String, description: '部门ID', example: '1234567890' })
  @IsNumberString({}, { message: '部门ID必须是数字字符串' })
  @Transform(({ value }) => {
    try {
      return BigInt(value); // 转换为BigInt
    } catch (e) {
      return null; // 或 throw new BadRequestException('无效的部门ID格式');
    }
  }, { toClassOnly: true })
  @Transform(({ value }) => value?.toString(), { toPlainOnly: true }) // 输出时转为字符串
  departmentId!: bigint;

  @ApiProperty({ description: '部门名称', example: '技术研发部' })
  @IsString()
  @Length(1, 100)
  departmentName!: string;

  // ========== 可选字段 ==========
  @ApiPropertyOptional({ description: '部门描述', example: '负责核心技术研发' })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  departmentDescription?: string;

  @ApiPropertyOptional({ 
    type: String, 
    description: '部门负责人ID', 
    example: '9876543210',
    nullable: true 
  })
  @IsOptional()
  @IsNumberString({}, { message: '负责人ID必须是数字字符串' })
  @Transform(({ value }) => value ? BigInt(value) : null, { toClassOnly: true })
  departmentLeaderId?: bigint | null;

  // ========== 系统字段 ==========
  @ApiPropertyOptional({ 
    description: '部门状态', 
    enum: StatusEnum,
    example: StatusEnum.ACTIVE
  })
  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;

  @ApiPropertyOptional({ 
    description: '创建时间', 
    example: '2023-01-01T00:00:00Z' 
  })
  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @ApiPropertyOptional({ 
    type: String, 
    description: '创建人ID', 
    example: '111122223333' 
  })
  @IsOptional()
  @IsNumberString()
  @Transform(({ value }) => value ? BigInt(value) : undefined)
  createdBy?: bigint;

  // ========== 业务编码 ==========
  @ApiPropertyOptional({ 
    description: '部门编码', 
    example: 'DEPT_IT',
    maxLength: 50 
  })
  @IsOptional()
  @IsString()
  @Matches(/^[A-Z0-9_]+$/)
  departmentCode?: string;
}