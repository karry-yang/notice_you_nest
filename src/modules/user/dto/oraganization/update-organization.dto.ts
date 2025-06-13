import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { 
  IsOptional, 
  IsString, 
  // IsString, 
  Length, 
  Matches,
} from 'class-validator';

export class UpdateOrganizationDto {
  // ========== 组织ID ==========
  @ApiPropertyOptional({
    type: String,
    description: '组织ID（路由参数，无需在Body中传递）',
    example: '1234567890',
    readOnly: true
  })
  // @Transform(({ value }) => value ? BigInt(value) : undefined, { toClassOnly: true })
  // @Transform(({ value }) => value?.toString(), { toPlainOnly: true })
  organizationId!: string;

  // ========== 基础信息 ==========
  @ApiPropertyOptional({
    description: '组织名称',
    example: '蚂蚁科技集团',
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  @Length(1, 100, { message: '组织名称长度需在1-100字符之间' })
  organizationName?: string;

  @ApiPropertyOptional({
    description: '组织描述',
    example: '全球领先的金融科技公司',
    maxLength: 500,
    nullable: true
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  organizationDescription?: string | null;

  // ========== 媒体资源 ==========
  @ApiPropertyOptional({
    description: 'OSS对象存储路径（如 org-logos/antgroup.png）',
    example: 'org-logos/updated-logo.png',
    maxLength: 255
  })
  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9/\-_.]+$/i, { 
    message: 'Logo路径只能包含字母、数字、斜杠、中划线和下划线' 
  })
  organizationLogo?: string;

  // ========== 负责人信息 ==========
  @ApiPropertyOptional({
    type: String,
    description: '组织负责人ID',
    example: '9876543210',
    nullable: true
  })
  @IsOptional()
  @IsString()
  // @Transform(({ value }) => value ? BigInt(value) : null)
  organizationLeaderId?: string | null;
}