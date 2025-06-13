import { IManualAuditableBase } from 'src/common/shared/baseInterface/manualAuditableBase.interface';
import { PermissionTypeEnum } from 'src/common/shared/enum/PermissionTypeEnum';
import { RolePermission } from '@user/entities/role-permission.entity';
import { PermissionRangeEnum } from '@shared/enum/PermissionRangeEnum';
// ApiNonAuthoritativeInformationResponse;
export interface IPermission extends IManualAuditableBase {
  permissionId: string; // 主键ID
  permissionName: string; // 权限名称
  // permissionDescription: string; // 权限描述
  permissionCode: string; // 权限编码
  permissionType: PermissionTypeEnum; // 权限类型，菜单或操作
  permissionRange: PermissionRangeEnum;
  organizationId?: string;
  departmentId?: string;
  permissionRole?: RolePermission[]; // 角色权限关联，可选
  permissionPriority: number
}
