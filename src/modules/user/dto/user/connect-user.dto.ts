import { Expose } from 'class-transformer';

/**
 * 作为联系人的展示用户数据传输对象
 */
export class ConnectUserDto {
  @Expose()
  userId!: bigint; // 用户ID
  @Expose()
  userName!: string; // 用户名称
  @Expose()
  userEmail!: string; // 用户邮箱
  @Expose()
  userPhone!: string; // 用户手机号码
  @Expose()
  organizationId?: bigint;
  //部门信息
  departmentId?: bigint; // 部门ID（可选）
}
