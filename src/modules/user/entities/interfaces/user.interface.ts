import { GenderEnum } from 'src/common/shared/enum/GenderEnum';
import { VipStatusEnum } from 'src/common/shared/enum/VipStatusEnum';
import { IManualAuditableBase } from 'src/common/shared/baseInterface/manualAuditableBase.interface';
import { UserRole } from '@user/entities/user-role.entity'; // 引入用户角色关联实体
import { Organization } from '../organization.entity';
import { Department } from '../department.entity';
import { UserSetting } from '../user-setting.entity';
import { User } from '../user.entity';
/**
 1. Omit<T, K>
作用：从类型 T 中排除指定的属性 K（可以是联合类型）。
2. Pick<T, K>
作用：从类型 T 中选择指定的属性 K（联合类型）。
3. Partial<T>
作用：将类型 T 的所有属性变为可选。
*/

/**
 * @description User全类型
 
*/
export interface IuserBase extends IManualAuditableBase {
  userId: string;
  userEmail: string;
  userPhone: string;
  userPassword: string;
  userSalt: string;
  userName: string;
  userGender: GenderEnum;
  userBirthday: Date;
  userAvatar: string;
  userVipStatus: VipStatusEnum;

  userRoles?: UserRole[]; // 这个保留数组即可

  superiorId?: string;
  superior?: Promise<User | null>; // 

  organizationId?: string;
  organization?: Promise<Organization | null>; // 

  departmentId?: string;
  department?: Promise<Department | null>; // 

  // userSettingId: string;
  // userSetting?: Promise<UserSetting | null>; 
}
