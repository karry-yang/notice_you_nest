// src/modules/permission/dto/create-permission.dto.ts
import { IsEnum, IsString, ValidateIf } from 'class-validator';
import { PermissionTypeEnum } from '@shared/enum/PermissionTypeEnum';
import { IsOptional } from 'class-validator';
export class CreatePermissionDto {
  @IsString()
  code !: string;

  @IsEnum(PermissionTypeEnum)
  type !: number;

  // 仅部门管理员可设置（且自动注入当前部门ID）
  @ValidateIf(o => o.type === PermissionTypeEnum.ADMIN_DEP)
  @IsOptional()
  depId?: bigint;

  // 仅组织管理员可设置
  @ValidateIf(o => o.type === PermissionTypeEnum.ADMIN_ORG)
  @IsOptional()
  orgId?: bigint;

  // 仅系统管理员可设置
  @ValidateIf(o => o.type === PermissionTypeEnum.ADMIN_SYS)
  @IsOptional()
  sysTag?: string;
}