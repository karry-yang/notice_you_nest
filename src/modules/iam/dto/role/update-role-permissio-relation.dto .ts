import { StatusEnum } from '@shared/enum/StatusEnum';
import { IsString, IsNotEmpty, IsPositive } from 'class-validator';

/**
 * @description 角色权限关联更新 DTO（用于中间表操作）
 */
 export class UpdateRolePermissionRelationDto {
    @IsNotEmpty({ message: '权限ID不能为空' })
    @IsPositive({ message: '权限ID必须为正整数' })
    permissionId!: number;
  
    @IsNotEmpty({ message: '操作类型不能为空' })
    @IsString({ message: '操作类型必须为字符串' })
    actionType!: 'add' | 'remove'; // 操作类型：添加或移除
  }