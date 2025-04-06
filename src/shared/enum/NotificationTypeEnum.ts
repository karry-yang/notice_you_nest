/**
 *   @description 通知类型
    ALLDEPARTMENTUSER=1,
    ALLORGANIZATIONUSER=2,
    MOREDEAPRTMENT=3,
    MOREUSER=4,
    ALLUSER=5
 * 1 NOTICE  通知
*/
//通知类型  （0:单个用户，1：全部门；2：全组织；，3：多部门；4多用户 5:全用户 ）
export enum NotificationTypeEnum {
  ONEUSER = 0,
  ALLDEPARTMENTUSER = 1,
  ALLORGANIZATIONUSER = 2,
  MOREDEAPRTMENT = 3,
  MOREUSER = 4,
  ALLUSER = 5,
}
