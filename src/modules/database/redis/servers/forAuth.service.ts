import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from './redis.service';
import { VerificationRedisDto } from '@database/redis/dto/verification-redis.dto';
import { RoleWithPermissionsDto } from 'src/common/dto/role-with-permissions.dto';

/**
 * @description 用于权限模块的用户注册/登录（登录暂时没有使用验证码模式）
 */
@Injectable()
export class RedisServiceForAuth extends RedisService {
  constructor(@Inject('REDIS_CLIENT_DB0') redisClient: Redis) {
    super(redisClient);
  }

  /**
   * 生成验证码 key 的统一规则
   * @param userEmail 邮箱
   */
  private getRegisterCodeKey(userEmail: string): string {
    return `auth:register:${userEmail}`;
  }

  /**
   * 设置注册验证码对象
   * @param userEmail 邮箱
   * @param code 验证码
   * @param ttl 过期时间（秒）默认60
   */
  async hsetRegisterCode(userEamil: string, code: string, count = 1, ttl = 60): Promise<void> {
    //生成key
    const key = this.getRegisterCodeKey(userEamil);
    this.setMulti(key, { code: code, expireAt: new Date(Date.now()).toISOString(), count: `${count}` }, ttl);
  }

  /**
   * 重新设置验证码代码
   * @param key
   * @param code 验证码
   * @param ttl 过期时间（秒）默认60
   */
  async hReSetRegisterCodeCode(verificationdto: VerificationRedisDto): Promise<void> {
    this.setMulti(verificationdto.key, { code: verificationdto.code, expireAt: new Date(Date.now() + 60 * 1000).toISOString(), count: `${verificationdto.count + 1}` }, 60);
  }

  /**
   * 获取注册验证码对象
   * @param userEmail 邮箱
   */
  async hgetRegisterCode(userEmail: string): Promise<VerificationRedisDto> {
    const key = this.getRegisterCodeKey(userEmail);
    return await this.hgetall(key);
  }

  /**
   * 删除注册验证码（注册成功或失效后清理）
   * @param userEmail 邮箱
   */
  async deleteRegisterCode(userEmail: string): Promise<void> {
    const key = this.getRegisterCodeKey(userEmail);
    await this.del(key);
  }

  /**
   * 获取验证码代码
   */
  async hgetRegisterCodeCode(userEamil: string): Promise<string | null> {
    const key = this.getRegisterCodeKey(userEamil);
    console.log(key);
    const code = await this.hget(key, 'code');
    console.log('code', code);
    return code;
  }
  async hgetRegisterCodeAccount(userEamil: string): Promise<number | null> {
    const key = this.getRegisterCodeKey(userEamil);
    const accout = await this.hget(key, 'count');
    return parseInt(accout ?? '0');
  }
  /**
   * ============================================
   */

  /**
   * 生成refreshToken key 的统一规则
   * @param userEmail 邮箱
   */
  private getrefreshTokenKey(userId: string): string {
    return `auth:refreshToken:${userId}`;
  }
  // 存储 refreshToken
  async setRefreshToken(userId: string, refreshToken: string, ttl: number): Promise<void> {
    // 将 refreshToken 存储在 Redis 中，使用 userId 作为键
    const key = this.getrefreshTokenKey(userId);
    await this.set(key, refreshToken, ttl);
  }

  // 获取 refreshToken
  async getRefreshToken(userId: string): Promise<string | null> {
    const key = this.getrefreshTokenKey(userId);
    return await this.get(key);
  }

  // 删除 refreshToken
  async deleteRefreshToken(userId: string): Promise<void> {
    const key = this.getrefreshTokenKey(userId);
    await this.del(key);
  }

  //黑名单

  private getBlackListKey(userEmail: string): string {
    return `auth:blackList:${userEmail}`;
  }

  // 设置黑名单，有效期 20 分钟
  async setBlackList(userEmail: string): Promise<void> {
    const key = this.getBlackListKey(userEmail);
    await this.set(key, '1', 20 * 60);
  }

  // 判断是否在黑名单
  async isInBlackList(userEmail: string): Promise<boolean> {
    const key = this.getBlackListKey(userEmail);
    const isIn = await this.get(key);
    return isIn !== null;
  }

  // 生成用户角色权限副本key
  private getUserRoleAndPermissionkey(userId: string) {
    return `auth:rolesPermissions:${userId}`;
  }
  private getUserRolekey(userId: string) {
    return `auth:role:${userId}`;
  }
  private getUserPermissionkey(userId: string) {
    return `auth:permission:${userId}`;
  }
  //设置简化橘色value
  private getUserRolesSimpleValue(roleType: string, orgId: string | null, depId: string | null) {
    return `${roleType}-${orgId}-${depId}`;
  }

  //设置简化权限value
  private getUserPermissionSimpleValue(permissionType: string, permissionCode: string, organizationId: string, departmentId: string) {
    return `${permissionType}-${organizationId}-${departmentId}-${permissionCode}`;
  }
  //存入用户角色代码数组对象和权限代码数组对象
  /**
   * {
    `auth:rolesPermissions:${userId}`: [
    "ADMIN-ORG:12345:67890",
    "USER:read",
    "USER:write"
  ]
}

  */

  //用户角色权限查询之后同时保存角色权限的副本和角色权限的拆分版本
  //@todo  需要和token的时间设置一致
  async setUserRolesAndPermissions(
    userId: string,
    rolesAndPermissions: RoleWithPermissionsDto[],
    ttl: number = 60 * 1000,
  ): Promise<void> {
    const key1 = this.getUserRoleAndPermissionkey(userId); // 全部对象结构
    const key2 = this.getUserRolekey(userId); // 简化角色结构
    const key3 = this.getUserPermissionkey(userId); // 简化权限结构
  
    // 原始结构
    const value1 = JSON.stringify(rolesAndPermissions);
  
    // 简化角色：['ADMIN_ORG:orgId:depId', ...]
    const value2 = rolesAndPermissions.map((role) =>
      this.getUserRolesSimpleValue(role.roleType, role.organizationId, role.departmentId),
    );
  
    // 简化权限：['global:create:orgId:depId', ...]
    const value3 = rolesAndPermissions
      .flatMap((role) =>
        role.permissions.map((p) =>
          this.getUserPermissionSimpleValue(p.permissionRange, p.permissionCode, p.organizationId, p.departmentId),
        ),
      );
  
    await this.set(key1,value1,ttl)
    await this.setMulti(key2,value2,ttl)
    await this.setMulti(key3,value3,ttl)
  }
  

  //获取用户角色权限的副本
  async getUserRolesAndPermissions(userId: string): Promise<RoleWithPermissionsDto[] | []> {
    const key = this.getUserRoleAndPermissionkey(userId);
    const data = await this.get(key);
    const roleAndPermissions = data ? JSON.parse(data) : null;
    return roleAndPermissions ? (roleAndPermissions as RoleWithPermissionsDto[]) : [];
  }


  /**
   * @description 获取用户的简化角色
   * @param userId 
   */
  async getUserSimpleRoles(userId:string ):Promise<string []>
  {
    const key= this.getUserRolekey(userId)
    const data= await this.get(key)
    return data?JSON.parse(data) : []
  }

 
  /**
   * @description 获取用户的简化权限
   * @param userId 
   */
  async getUserSimplePermission(userId:string):Promise<string[]>
  {
    const key= this.getUserPermissionkey(userId)
    const data= await this.get(key)
    return data?JSON.parse(data) : []
  }
}
