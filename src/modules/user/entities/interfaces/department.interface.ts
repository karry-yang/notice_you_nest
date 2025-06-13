import { User } from '../user.entity';
import { Organization } from '../organization.entity';
import { IManualAuditableBase } from 'src/common/shared/baseInterface/manualAuditableBase.interface';
export interface IDepartment extends IManualAuditableBase {
  departmentId: string;

  departmentName: string;

  organization?: Promise<Organization>;

  leaderId: string;
  superiorId ?:string
  departmentUser?: Promise<User | null>;
}
