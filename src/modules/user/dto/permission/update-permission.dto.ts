import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { StatusEnum } from '@shared/enum/RowStatusEnum';

export class UpdatePermissionDto {
  @ApiProperty({
    type: String,
    description: '权限ID',
    example: '1234567890',
  })
  @Transform(({ value }) => BigInt(value))
  permissionId!: bigint;

  @ApiPropertyOptional({
    description: '权限名称',
    example: '用户查看权限',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  permissionName?: string;

  @ApiPropertyOptional({
    description: '权限描述',
    example: '允许查看用户信息',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  permissionDescription?: string;

  @ApiPropertyOptional({
    description: '权限状态',
    enum: StatusEnum,
    example: StatusEnum.ACTIVE,
  })
  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;

  @ApiPropertyOptional({
    type: String,
    description: '所属组织ID',
    example: '1234567890123',
    nullable: true,
  })
  @IsOptional()
  @Transform(({ value }) => (value !== undefined && value !== null ? BigInt(value) : undefined))
  organizationId?: bigint;

  @ApiPropertyOptional({
    type: String,
    description: '所属部门ID',
    example: '9876543210987',
    nullable: true,
  })
  @IsOptional()
  @Transform(({ value }) => (value !== undefined && value !== null ? BigInt(value) : undefined))
  departmentId?: bigint;
}
