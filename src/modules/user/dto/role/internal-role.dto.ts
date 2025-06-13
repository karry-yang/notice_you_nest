import { InternalPermissionDto } from '@user/dto/permission/internal-permission.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Expose } from 'class-transformer';
import { IsString, IsOptional, IsEnum, IsNumberString, Matches } from 'class-validator';
export class InternalRoleDto {
  @ApiProperty({ type: String, description: '角色id', example: '12345678' })
  @Transform(({ value }) => BigInt(value), { toClassOnly: true }) // 输入转BigInt
  @Transform(({ value }) => value?.toString(), { toPlainOnly: true }) //
  roleId!: bigint;

  @ApiProperty({ description: '组织名称', example: '阿里巴巴集团' })
  @IsString()
  roleName!: string;

  // ========== 可选字段 ==========
  @ApiPropertyOptional({
    description: '组织描述',
    example: '全球领先的电子商务平台',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  roleDescription?: string;

  @ApiPropertyOptional({
    description: '角色代码',
    example: 'ORG_ALIBABA',
    maxLength: 50,
  })
  @Expose()
  @IsOptional()
  @IsString()
  @Matches(/^[A-Z0-9_]+$/) // 限制大写字母、数字、下划线
  roleCode!: string;
  status?: boolean;
  rolePermissions?: InternalPermissionDto[];
}
