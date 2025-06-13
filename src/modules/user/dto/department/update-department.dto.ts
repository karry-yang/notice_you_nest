import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsNumberString, Length, Matches } from 'class-validator';

export class UpdateDepartmentDto {
  @ApiPropertyOptional({
    type: String,
    description: '组织ID(不可修改，仅用于路由）',
    example: '1234567890',
    readOnly: true, // 明确标记该字段不应由前端修改
  })
  @Transform(({ value }) => BigInt(value), { toClassOnly: true }) // 输入转BigInt
  @Transform(({ value }) => value?.toString(), { toPlainOnly: true }) // 输出转字符串
  organizationId!: bigint;

  @ApiPropertyOptional({
    description: '组织名称',
    example: '阿里巴巴集团',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @Length(1, 100, { message: '组织名称长度需在1-100字符之间' })
  organizationName?: string;

  @ApiPropertyOptional({
    description: '组织描述',
    example: '全球领先的电子商务平台',
    maxLength: 500,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  organizationDescription?: string | null;

 

  @ApiPropertyOptional({
    type: String,
    description: '组织负责人ID',
    example: '9876543210',
    nullable: true,
  })
  @IsOptional()
  @IsNumberString({}, { message: '负责人ID必须是数字字符串' })
  @Transform(({ value }) => (value ? BigInt(value) : null)) // 安全转换
  organizationLeaderId?: bigint | null;
}
