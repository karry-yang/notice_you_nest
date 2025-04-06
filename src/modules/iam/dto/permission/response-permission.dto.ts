// src/modules/permission/dto/response-permission.dto.ts
import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SystemUserTypeEnum } from '@shared/enum/SystemUserTypeEnum';
import { PermissionRangeEnum } from '@shared/enum/PermissionRangeEnum';

/**
 * @description 权限响应DTO - 严格按角色隔离数据范围
 */
export class ResponsePermissionDto {
  // ================= 所有角色可见字段 =================
  @Expose()
  @ApiProperty({
    description: '权限编码',
    example: 'user:read'
  })
  code !: string;

  @Expose()
  @ApiProperty({
    description: '权限类型',
    enum: PermissionRangeEnum,
    example: PermissionRangeEnum.USER
  })
  type !: number;

  // ================= 部门级字段 =================
  @Expose({ groups: [SystemUserTypeEnum.ADMIN_DEP] })
  @Transform(({ value }) => value?.toString(), { toPlainOnly: true })
  @ApiPropertyOptional({
    description: '所属部门ID（仅部门管理员可见）',
    type: String,
    example: '123'
  })
  depId?: bigint;

  @Expose({ groups: [SystemUserTypeEnum.ADMIN_DEP] })
  @ApiPropertyOptional({
    description: '部门权限创建时间（仅部门管理员可见）',
    example: '2023-01-01T00:00:00Z'
  })
  depCreatedAt?: Date;

  // ================= 组织级字段 =================
  @Expose({ groups: [SystemUserTypeEnum.ADMIN_ORG] })
  @Transform(({ value }) => value?.toString(), { toPlainOnly: true })
  @ApiPropertyOptional({
    description: '所属组织ID（仅组织管理员可见）',
    type: String,
    example: '456'
  })
  orgId?: bigint;

  @Expose({ groups: [SystemUserTypeEnum.ADMIN_ORG] })
  @ApiPropertyOptional({
    description: '组织权限创建时间（仅组织管理员可见）',
    example: '2023-01-01T00:00:00Z'
  })
  orgCreatedAt?: Date;

  // ================= 系统级字段 =================
  @Expose({ groups: [SystemUserTypeEnum.ADMIN_SYS] })
  @ApiPropertyOptional({
    description: '系统级标记（仅系统管理员可见）',
    example: 'GLOBAL_CONFIG'
  })
  sysTag?: string;

  @Expose({ groups: [SystemUserTypeEnum.ADMIN_SYS] })
  @ApiPropertyOptional({
    description: '系统权限创建人（仅系统管理员可见）',
    type: String,
    example: '789'
  })
  @Transform(({ value }) => value?.toString(), { toPlainOnly: true })
  sysCreatedBy?: bigint;

  // ================= 动态元数据 =================
  @Expose()
  @Transform(({ obj, value }) => {
    // 根据权限类型动态返回范围描述
    switch (obj.type) {
      case PermissionRangeEnum.DEP:
        return `部门ID: ${obj.depId}`;
      case PermissionRangeEnum.ORG:
        return `组织ID: ${obj.orgId}`;
      case PermissionRangeEnum.SYS:
        return '系统全局权限';
      default:
        return '基础权限';
    }
  })
  @ApiProperty({
    description: '权限范围描述（自动生成）',
    example: '部门ID: 123'
  })
  scopeDescription! : string;
}