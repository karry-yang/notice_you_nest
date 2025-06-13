import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StatusEnum } from '@shared/enum/RowStatusEnum';
import { Transform, Type } from 'class-transformer';
import { IsString, IsOptional, IsEnum, IsNumberString } from 'class-validator';

export class InternalOrganizationDto {
  // ========== 核心字段 ==========
  @ApiProperty({ type: String, description: '组织ID', example: '1234567890' })
  @Transform(({ value }) => BigInt(value), { toClassOnly: true }) // 输入转BigInt
  @Transform(({ value }) => value?.toString(), { toPlainOnly: true }) // 输出转字符串
  organizationId!: bigint;

  @ApiProperty({ description: '组织名称', example: '阿里巴巴集团' })
  @IsString()
  organizationName!: string;

  // ========== 可选字段 ==========
  @ApiPropertyOptional({
    description: '组织描述',
    example: '全球领先的电子商务平台',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  organizationDescription?: string | null;

  @ApiPropertyOptional({
    description: 'OSS对象存储路径',
    example: 'org-logos/alibaba.png',
  })
  @IsOptional()
  @IsString()
  organizationLogo?: string;

  // ========== 关联字段 ==========
  @ApiPropertyOptional({
    type: String,
    description: '组织负责人ID',
    example: '9876543210',
    nullable: true,
  })
  @IsOptional()
  @IsNumberString()
  @Transform(({ value }) => (value ? BigInt(value) : null))
  organizationLeaderId?: bigint | null;

  // ========== 系统字段 ==========
  @ApiPropertyOptional({
    enum: StatusEnum,
    example: StatusEnum.ACTIVE,
  })
  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;

  @ApiPropertyOptional({
    description: '创建时间',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @Type(() => Date) // 确保日期类型转换
  createdAt?: Date;

  @ApiPropertyOptional({
    type: String,
    description: '创建人ID',
    example: '111122223333',
  })
  @IsOptional()
  @Transform(({ value }) => value?.toString())
  createdBy?: bigint;

  // 可选属性部门

  @ApiPropertyOptional({
    description: '子部门列表（可选）',
    type: [InternalOrganizationDto],
    isArray: true,
    nullable: true,
  })
  departments?: InternalOrganizationDto[]; // 递归引用，用于表示子部门或关联的组织结构
}
