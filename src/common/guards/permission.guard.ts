import { CanActivate, ExecutionContext, Injectable, ForbiddenException, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from '../decorators/permission.decorator';
import { Request } from 'express';
import { IUserManageServiceToken } from '../token/tokens';
import { IUserManageService } from '@user/services/interface/user-manager.interface';
import { RedisServiceForAuth } from '@database/redis/servers/forAuth.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(IUserManageServiceToken) private readonly userService: IUserManageService,
    @Inject(RedisServiceForAuth) private readonly redisServiceForAuth: RedisServiceForAuth
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSION_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true; // 没有设置权限码，默认放行
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const { userId, organizationId, departmentId } = user;
    if (!userId || !organizationId || !departmentId) {
      throw new ForbiddenException('用户权限信息缺失');
    }

    /**
 *   从redis中获取缓存的用户权限    对比组织id
    对比权限范围
   权限范围是：golbal：系统级别    org:组织  dep：部门
     范围是组织部门级别的  需要验证是否属于本组织
*/

    //获取reids中的缓存简化权限
    const userPermissions = await this.redisServiceForAuth.getUserSimplePermission(userId);

    const matchedPermissions = userPermissions.filter((perm) => {
      const [type, org, dep, code] = perm.split('-');

      return (
        (type === 'gobal' && requiredPermissions.includes(code)) || //系统全局权限   权限代码一致
        (org === organizationId && dep === departmentId && requiredPermissions.includes(code)) || //组织部门权限  对比组织id和部门id
        (org === organizationId && dep === '1' && requiredPermissions.includes(code)) //组织权限  对比组织id   部门id为1 表示全部
      );
    });

    if (!matchedPermissions || matchedPermissions.length <= 0) {
      throw new ForbiddenException('没有权限访问该资源');
    }

    return true;
  }
}
