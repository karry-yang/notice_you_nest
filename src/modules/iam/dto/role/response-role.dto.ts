import { Expose, Type } from 'class-transformer';
import { ResponsePermissionDto } from '@iam/dto/permission/response-permission.dto';
export class ResponseRoleDto {

  roleId!: bigint;
  roleName?: string;
  roleDesc?: string;
  roleCode!: string;
  status?: boolean;
  @Expose()
  @Type(() => ResponsePermissionDto)
  rolePermissions!: ResponsePermissionDto;
}