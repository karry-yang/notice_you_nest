import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PermissionTypeEnum } from 'src/common/shared/enum/PermissionTypeEnum';
import { Expose, Transform, Type } from 'class-transformer';
import { StatusEnum } from '@shared/enum/RowStatusEnum';
import { ValidateNested, IsOptional, IsEnum } from 'class-validator';
import {ConnectUserDto } from '../user/connect-user.dto';

export class ResponsePermissionDto {
  // ========== 基础信息 ==========
  @ApiProperty({
    type: String,
    description: '权限ID',
    example: '1234567890',
  })
  @Expose()
  @Transform(({ value }) => value?.toString())
  permissionId!: bigint;

  @ApiProperty({
    description: '权限名称',
    example: '用户管理',
  })
  @Expose()
  permissionName!: string;

  @ApiPropertyOptional({
    description: '权限描述',
    example: '允许删除用户',
    nullable: true,
  })
  @Expose()
  permissionDescription?: string | null;

  @ApiProperty({
    description: '权限编码（资源:操作）',
    example: 'user:del',
  })
  @Expose()
  permissionCode!: string;

  // ========== 权限类型与范围 ==========
  @ApiProperty({
    enum: PermissionTypeEnum,
    example: PermissionTypeEnum.READ,
  })
  @Expose()
  permissionType!: PermissionTypeEnum;

  @ApiPropertyOptional({
    type: String,
    description: '所属组织ID（ORG/DEPT类型时显示）',
    example: '9876543210',
    nullable: true,
  })
  @Expose()
  @Transform(({ value }) => value?.toString())
  organizationId?: bigint | null;

  @ApiPropertyOptional({
    type: String,
    description: '所属部门ID（DEPT类型时显示）',
    example: '5678901234',
    nullable: true,
  })
  @Expose()
  @Transform(({ value }) => value?.toString())
  departmentId?: bigint | null;


  // ========== 审计信息 ==========
  @ApiPropertyOptional({
    type: String,
    description: '创建时间',
    example: '2023-01-01T00:00:00Z',
    nullable: true,
  })
  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt?: Date;

  //创建人信息

  @ApiProperty({
    description: '创建人信息',
    type: () => ConnectUserDto, // 避免循环引用
  })
  @Type(() => ConnectUserDto) // 启用嵌套DTO转换
  @ValidateNested() // 验证嵌套对象
  createdBy!: ConnectUserDto;

  @ApiPropertyOptional({
    type: String,
    description: '最后更新时间',
    example: '2023-01-02T00:00:00Z',
    nullable: true,
  })
  @Expose()
  @Transform(({ value }) => value?.toISOString())
  updatedAt?: Date;
  //修改人信息

  @ApiPropertyOptional({
    description: '修改人信息',
    type: () => ConnectUserDto,
  })
  // @IsOptional()
  @Type(() => ConnectUserDto)
  @ValidateNested()
  updatedBy?: ConnectUserDto;
  // 状态
  @ApiPropertyOptional({
    description: '部门状态',
    enum: StatusEnum,
    example: StatusEnum.ACTIVE,
  })
  // @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;
}
