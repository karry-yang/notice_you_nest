// import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { UserService } from '@user/services/user/user.service'; // 导入用于查找用户的服务
// import { ROLES_KEY } from '../decorators/roles.decorator'; // 导入ROLES_KEY常量

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(
//     private readonly reflector: Reflector,
//     private readonly userService: UserService // 注入用户服务
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
//     if (!requiredRoles) {
//       return true; // 如果没有角色要求，直接通过
//     }

//     const request = context.switchToHttp().getRequest();
//     const user = request.user;

//     if (!user) {
//       throw new ForbiddenException('No user found');
//     }

//     // 获取用户角色
//     const roles = await this.userService.findUserRoles(user.userId);

//     return roles.some((role) => requiredRoles.includes(role.roleCode));
//   }
// }

// common/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
// import { UserManageService } from '@user/services/user/user-manage.service';
import { IUserManageServiceToken } from '../token/tokens';
import { IUserManageService } from '@user/services/interface/user-manager.interface';
import { RedisServiceForAuth } from '@database/redis/servers/forAuth.service';

//定义角色代码为ADMIN-XXX:ORGID:DEPID
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(IUserManageServiceToken) private readonly userService: IUserManageService,
    @Inject(RedisServiceForAuth) private readonly redisServiceForAuth: RedisServiceForAuth
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // 无需角色验证
    }

    //获取currentUser
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const { userId, organizationId,departmentId} = user;
    if (!userId || !organizationId) {
      throw new ForbiddenException('用户身份信息缺失');
    }

    // 查询用户在该组织下的角色=>当前是角色首位  获取redis中预留（登录的时候进行了查询的）的auth:${userId}:{}

    // const userRoles = await this.userService.getUserRolesInOrganization(userId, organizationId);

    //获取缓存的角色(包含权限)的缓存数据
    const cacheUserRoles = await this.redisServiceForAuth.getUserSimpleRoles(userId);
    //分解简化角色信息,roleType
    const userRoleTypes = cacheUserRoles.map((role: string) => role.split(':')[0]);
    //确定组织避免信息的泄露
    const organization=cacheUserRoles.map((role: string) => role.split(':')[1])


  

    const hasRole = requiredRoles.some((role) => userRoleTypes.includes(role));
    const isInOrg = organization.includes(organizationId);


    if (!hasRole ||!isInOrg) {
      throw new ForbiddenException('无访问权限');
    }

    return true;
  }
}
