import { AutoAuditableBase } from './autoAuditableBase.entity';
import { StatusEnum } from '@shared/enum/RowStatusEnum';
import { IManualAuditableBase } from 'src/common/shared/baseInterface/manualAuditableBase.interface';
import { Column } from 'typeorm';
export class ManualAuditableBase extends AutoAuditableBase implements IManualAuditableBase {
  @Column({ name: 'created_by', type: 'bigint', default: 0 })
  createdBy!: string;
  @Column({ name: 'updated_by', type: 'bigint', default: 0 })
  updatedBy!: string;
  @Column({ name: 'status', type: 'enum', enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusEnum = StatusEnum.ACTIVE; // 默认状态为 ACTIVE
}
