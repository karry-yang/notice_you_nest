// src/modules/permission/dto/internal-permission.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PermissionTypeEnum } from 'src/common/shared/enum/PermissionTypeEnum';
import { Transform, Type } from 'class-transformer';
import { StatusEnum } from '@shared/enum/RowStatusEnum';
import { IsOptional, IsEnum, ValidateNested } from 'class-validator';
import { ConnectUserDto } from '@user/dto/user/connect-user.dto';

export class InternalPermissionDto {
  @ApiProperty({ description: '权限ID', type: String })
  @Transform(({ value }) => value?.toString(), { toPlainOnly: true })
  permissionId!: bigint;

  @ApiProperty({ description: '权限编码', example: 'user:create' })
  permissionCode!: string;

  @ApiProperty({
    enum: PermissionTypeEnum,
    enumName: 'PermissionTypeEnum', // 明确枚举名称
    example: PermissionTypeEnum.READ,
    description: `
      权限类型：
      - ADMIN_SYS: 系统管理员权限
      - ADMIN_ORG: 组织管理员权限
      - ADMIN_DEP: 部门管理员权限
      - USER: 普通用户权限
    `,
  })
  @IsEnum(PermissionTypeEnum, {
    message: `权限类型必须是 ${Object.values(PermissionTypeEnum).join(', ')} 之一`,
  })
  permissionType!: PermissionTypeEnum;

  @ApiPropertyOptional({ description: '所属部门ID', type: String, required: false })
  @Transform(({ value }) => value?.toString(), { toPlainOnly: true })
  departmentId?: bigint;

  @ApiPropertyOptional({ description: '所属组织ID', type: String, required: false })
  @Transform(({ value }) => value?.toString(), { toPlainOnly: true })
  organizaiotnId?: bigint;

  @ApiProperty({ description: '创建时间' })
  createdAt!: Date;

  @ApiProperty({
    description: '创建人信息',
    type: () => ConnectUserDto, // 避免循环引用
  })
  @Type(() => ConnectUserDto) // 启用嵌套DTO转换
  @ValidateNested() // 验证嵌套对象
  createdBy!: ConnectUserDto;

  // ========== 更新信息 ==========
  @ApiPropertyOptional({
    description: '修改时间',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  updatedAt?: Date;

  @ApiPropertyOptional({
    description: '修改人信息',
    type: () => ConnectUserDto,
  })
  @IsOptional()
  @Type(() => ConnectUserDto)
  @ValidateNested()
  updatedBy?: ConnectUserDto;

  @ApiProperty({
    description: '部门状态',
    enum: StatusEnum,
    example: StatusEnum.ACTIVE,
  })
  @IsOptional()
  @IsEnum(StatusEnum)
  status!: StatusEnum;
}
