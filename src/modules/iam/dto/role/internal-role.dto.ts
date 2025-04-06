import { InternalPermissionDto } from '@iam/dto/permission/internal-permission.dto';

export class InternalRoleDto {

  roleId!: bigint;
  roleName?: string;
  roleDesc?: string;
  roleCode!: string;
  status?: boolean;
  rolePermissions?: InternalPermissionDto[];
}