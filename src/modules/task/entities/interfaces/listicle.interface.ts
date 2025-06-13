import { IManualAuditableBase } from 'src/common/shared/baseInterface/manualAuditableBase.interface';
import { ListicleTypeEnum } from 'src/common/shared/enum/ListicleTypeEnum';

export interface Ilisticle extends IManualAuditableBase {
  listicleId: string;
  listicleTitle: string;
  listicleIcon:string
  listicleType:ListicleTypeEnum;
  organizationId?: string ;
  departmentId?: string ;
  userId?: string ;

}
