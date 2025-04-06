import { PermissionTypeEnum } from "@shared/enum/PermissionTypeEnum";

export interface IPermission {
    permissionId: bigint; // 主键ID
    permissionName: string; // 权限名称
    permissionDescription: string; // 权限描述
    permissionCode: string; // 权限编码
    permissionType: PermissionTypeEnum; // 权限类型，菜单或操作
    parentId?: bigint; // 父权限ID，可选
    }