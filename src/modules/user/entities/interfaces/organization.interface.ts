import { Department } from '../department.entity';
import { User } from '../user.entity';
import { IManualAuditableBase } from 'src/common/shared/baseInterface/manualAuditableBase.interface';
export interface IOrganization extends IManualAuditableBase {
  organizationId: string;

  organizationName: string;

  organizationCode: string;

  leaderId: string;

  organizationLogo?: string | null;

  departments?: Promise<Department[]>;

  organizationLeader?: User;
}
