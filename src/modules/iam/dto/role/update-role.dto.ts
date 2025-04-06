import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsNotEmpty, IsArray, IsPositive, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '@iam/entities/role.entity';
import { UpdateRolePermissionRelationDto } from '@iam/dto/role/update-role-permissio-relation.dto ';
export class UpdateRoleDto extends PartialType(Role) {
  @IsOptional()
  @IsString({ message: '角色名称必须为字符串' })
  @IsNotEmpty({ message: '角色名称不能为空' })
  roleName?: string;

  @IsOptional()
  @IsString({ message: '角色描述必须为字符串' })
  roleDescription?: string;

  @IsOptional()
  @IsString({ message: '角色编码必须为字符串' })
  @IsNotEmpty({ message: '角色编码不能为空' })
  roleCode?: string;

  @IsOptional()
  @IsArray({ message: '权限操作必须为数组' })
  @ArrayMinSize(1, { message: '至少需要一个权限操作' })
  @ValidateNested({ each: true }) // 嵌套对象验证
  @Type(() => UpdateRolePermissionRelationDto) // 类型转换
  permissionOperations?: UpdateRolePermissionRelationDto[];
}