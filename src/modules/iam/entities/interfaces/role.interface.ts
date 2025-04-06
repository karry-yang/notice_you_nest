import { IManualAuditableBase } from "@shared/baseInterface/manualAuditableBase.interface";

export interface IRole  extends IManualAuditableBase{
  roleId: bigint;
  roleName: string;
  roleDescription: string;
  roleCode: string;
}
