import { IsString, Length, IsNumberString, IsOptional, isString } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateOrganizationDto {
  @ApiProperty({
    description: '组织名称',
    example: '阿里巴巴集团',
    maxLength: 100,
  })
  @IsString()
  @Length(0, 100, { message: '组织名称长度必须在1-100字符之间' })
  organizationName!: string; //组织的名称


  @IsString()
  @Length(0, 255, { message: '组织名称长度必须在1-100字符之间' })
  @ApiPropertyOptional({
    description: '组织描述',
    example: '一家全球领先的互联网科技公司，专注于电子商务、云计算和数字娱乐等领域。',
    maxLength: 255,
  })
  @IsString()
  @Length(0, 255, { message: '组织描述最长255字符' })
  organizationDescription?: string; //组织的描述（可选）

  
  @IsString()
  @Length(0, 255, { message: 'oss图片的相对路径 默认路径xxx暂时没确定' })
  @ApiPropertyOptional({
    description: '组织Logo的相对路径（如 images/org-logos/abc123.jpg）',
    example: 'images/org-logos/alibaba.png',
    maxLength: 255, // 限制最大长度为255
    nullable: true, // 允许为null 
  })
  organizationLogo?: string; //组织的logo（可选）

  @IsNumberString({}, { message: '组织领导的用户ID必须是数字字符串' })
  @Length(0, 64, { message: '组织领导的用户ID长度必须在1-64位之间' })
  @ApiPropertyOptional({
    description: '组织领导的用户ID（可选）',  
    example: '1234567890', // 示例值
    type: String, // 确保类型为字符串
    nullable: true, // 允许为null
  })
  @Transform(({ value }) => (value ? BigInt(value) : null), { toClassOnly: true })
  organizationLeaderId?: bigint; //组织领导的用户ID（可选）
}
