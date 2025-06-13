
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IAutoAuditableBase } from 'src/common/shared/baseInterface/autoAuditableBase.interface';
export abstract class AutoAuditableBase implements IAutoAuditableBase {
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
