export interface RoleWithPermissionsDto {
  roleId: string;
  roleName: string;
  roleType: string;
  organizationId: string;
  departmentId: string;
  // roleCode: string;
  permissions: {
    permissionId: string;
    permissionCode: string;
    permissionRange: string;
    organizationId: string ;
    departmentId: string;
  }[];
}
