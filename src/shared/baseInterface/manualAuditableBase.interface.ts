import { StatusEnum } from '@shared/enum/StatusEnum';
export interface IManualAuditableBase {
  createdBy: bigint;

  updatedBy: bigint;

  status: StatusEnum;
}
