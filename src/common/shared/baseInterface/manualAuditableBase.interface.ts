import { StatusEnum } from '@shared/enum/RowStatusEnum';
export interface IManualAuditableBase {
  createdBy: string;

  updatedBy: string;

  status: StatusEnum;
}
