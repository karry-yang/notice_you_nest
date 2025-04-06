import { StatusEnum } from '@shared/enum/StatusEnum';
import { IsEnum, IsNotEmpty, IsOptional, IsArray, IsString, ValidateNested, ArrayMinSize } from 'class-validator';
import {UpdateRolePermissionRelationDto} from '@iam/dto/role/update-role-permissio-relation.dto '
import { Type } from 'class-transformer'; // 导入 Type 装饰器
/**
 * @description 创建角色信息的dto类
/**
 * @description 更新角色信息的dto类  
*/
export class UpdateRoleDto {
  @IsOptional() // 标记为可选字段
  @IsString({ message: '角色名称必须为字符串' })
  @IsNotEmpty({ message: '角色名称不能为空' })
  roleName?: string;

  @IsOptional()
  @IsString()
  roleDesc?: string = ''; // 默认值通过构造函数或逻辑层处理

  @IsOptional()
  @IsEnum(StatusEnum, { message: '无效的状态值' })
  status?: StatusEnum;

  @IsOptional()
  @IsArray({ message: '权限列表必须为数组' })
  @ArrayMinSize(1, { message: '至少需要分配一个权限' })
  @ValidateNested({ each: true }) // 验证嵌套对象
  @Type(() => UpdateRolePermissionRelationDto) // 确保嵌套类型转换
  rolePermissions?: UpdateRolePermissionRelationDto[];
}