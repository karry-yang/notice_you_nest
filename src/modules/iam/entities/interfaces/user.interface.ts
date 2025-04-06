import { GenderEnum } from '@shared/enum/GenderEnum';
import { VipStatusEnum } from '@shared/enum/VipStatusEnum';
import { IManualAuditableBase } from '@shared/baseInterface/manualAuditableBase.interface';
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
  userId: bigint;
  userEamil: string;
  userPhone: string;
  userPassword: string;
  userSalt: string;
  userName: string;
  userGender: GenderEnum;
  userBirthday: Date;
  userAvatar: string;
  userSuperiorId: bigint;
  userVipStatus: VipStatusEnum;
  userSettingId: bigint;
  userRoles?: any[]; // 角色权限关联实体数组，可选属性
}
