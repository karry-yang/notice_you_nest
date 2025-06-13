import { Expose, Type } from 'class-transformer';
import { ResponsePermissionDto } from '@user/dto/permission/response-permission.dto';
import { StatusEnum } from '@shared/enum/RowStatusEnum';
export class ResponseRoleDto {

  roleId!: bigint;
  roleName?: string;
  roleDesc?: string;
  roleCode!: string;
  status?: StatusEnum;
  @Expose()
  @Type(() => ResponsePermissionDto)
  rolePermissions!: ResponsePermissionDto;
}