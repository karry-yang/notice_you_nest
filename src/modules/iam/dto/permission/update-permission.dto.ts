// src/modules/permission/dto/update-permission.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';
import { Exclude } from 'class-transformer';
import { IsString,IsOptional,IsBoolean } from 'class-validator';
export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  // 禁止修改权限类型和范围ID
  @Exclude()
  type?: never;

  @Exclude()
  depId?: never;

  @Exclude()
  orgId?: never;

  @Exclude()
  sysTag?: never;

  // 仅允许修改以下字段
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}