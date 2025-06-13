import { IsString, Length, IsNumberString, IsOptional } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({
    description: '部门名称',
    example: '技术研发部',
    maxLength: 100,
  })
  @IsString()
  @Length(1, 100, { message: '部门名称长度必须在1-100字符之间' })
  departmentName!: string;

  @ApiPropertyOptional({
    description: '部门描述',
    example: '负责产品技术研发与创新',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @Length(0, 255, { message: '部门描述最长255字符' })
  departmentDescription?: string;

  @ApiPropertyOptional({
    description: '部门负责人ID',
    type: String,
    example: '1234567890',
    nullable: true,
  })
  @IsOptional()
  @IsNumberString({}, { message: '负责人ID必须是数字字符串' })
  @Transform(({ value }) => {
    if (value === null || value === undefined) return null;
    try {
      return BigInt(value);
    } catch {
      return null; // 或 throw new BadRequestException('无效的负责人ID格式');
    }
  })
  departmentLeaderId: bigint | null = null;

  @ApiPropertyOptional({
    description: '上级部门ID',
    type: String,
    example: '9876543210',
  })
  @IsOptional()
  @IsNumberString({}, { message: '上级部门ID必须是数字字符串' })
  @Transform(({ value }) => {
    try {
      return value ? BigInt(value) : undefined;
    } catch {
      throw new BadRequestException('无效的上级部门ID格式');
    }
  })
  parentDepartmentId?: bigint;
}
