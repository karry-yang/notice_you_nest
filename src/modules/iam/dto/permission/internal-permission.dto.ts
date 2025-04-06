// src/modules/permission/dto/internal-permission.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { PermissionTypeEnum } from '@shared/enum/PermissionTypeEnum';
import { Transform } from 'class-transformer';
export class InternalPermissionDto {
  @ApiProperty({ description: '权限ID', type: String })
  @Transform(({ value }) => value?.toString(), { toPlainOnly: true })
  id !: bigint;

  @ApiProperty({ description: '权限编码', example: 'user:create' })
  code !: string;

  @ApiProperty({ enum: PermissionTypeEnum, example: PermissionTypeEnum.ADMIN_DEP})
  type !: number;

  @ApiProperty({ description: '所属部门ID', type: String, required: false })
  @Transform(({ value }) => value?.toString(), { toPlainOnly: true })
  depId?: bigint;

  @ApiProperty({ description: '所属组织ID', type: String, required: false })
  @Transform(({ value }) => value?.toString(), { toPlainOnly: true })
  orgId?: bigint;

  @ApiProperty({ description: '系统标记', required: false })
  sysTag?: string;

  @ApiProperty({ description: '创建时间' })
  createdAt?: Date;

  @ApiProperty({ description: '创建人ID', type: String })
  @Transform(({ value }) => value?.toString(), { toPlainOnly: true })
  createdBy ?: bigint;
}