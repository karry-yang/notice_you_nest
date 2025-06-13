import { HttpException, HttpStatus, Inject } from '@nestjs/common';
// import { IUserRepository } from '@user/repositories/interfaces/user.repository.interface';
import { IAuthManageService } from '../interface/auth-manage.interface';
import { IAuthManageRepository } from '@user/repositories/interfaces/auth-manage.repository.interface';
import { IAuthManageRepositoryToken } from 'src/common/token/tokens';
import { RoleWithPermissionsDto } from 'src/common/dto/role-with-permissions.dto';

export class AuthManageService implements IAuthManageService {
  constructor(
    @Inject(IAuthManageRepositoryToken)
    private readonly authManageRepository: IAuthManageRepository // 必须与provider的token一致
  ) {}
  findRolesAndPmermissiosByUserId(uId: string): Promise<RoleWithPermissionsDto[]> {
    throw new Error('Method not implemented.');
  }


    //查询用户的权限信息
    async findUserAuth(userId: string): Promise<RoleWithPermissionsDto[]> {
      const roles = await this.authManageRepository.findRolesAndPmermissiosByUserId(userId);
      if (!roles) {
        throw new Error('用户不存在或者该用户没有角色权限存在');
      }
      return  roles
    
    }
  
  



}
