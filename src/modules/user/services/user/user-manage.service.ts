import { Injectable, Inject, HttpException, HttpStatus, forwardRef } from '@nestjs/common';
import { CreateUserDto } from '@user/dto/user/create-user.dto';
import { InternalUserDto } from '@user/dto/user/internal-user.dto';
import { IUserManageRepository } from '@user/repositories/interfaces/user-manage.repository.interface';
import { plainToInstance } from 'class-transformer';
import { IUserManageService } from '../interface/user-manager.interface';
import { PaginatedResult } from 'src/common/types/paginatedResult.interface';
import { PasswordHelper } from 'src/common/shared/lib/password.helper';
import { IUserManageRepositoryToken } from 'src/common/token/tokens';
import { User } from '@user/entities/user.entity';
import { error } from 'console';
@Injectable()
export class UserManageService implements IUserManageService {
  constructor(
    //forwardRef 是为了解决类之间互相依赖
    // @Inject(token) 是为了解耦服务之间的依赖（避免直接引用类）
    @Inject(IUserManageRepositoryToken)
    private readonly userManageRepository: IUserManageRepository // 必须与provider的token一致

 //redis缓存服务
//  @Inject(RedisFo)
  ) {}
  findUserByUserEmail(userEamil: string): Promise<InternalUserDto | null> {
    throw new Error('Method not implemented.');
  }

  //批量创建
  async batchCreateUsers(userDtos: CreateUserDto[]): Promise<any> {
    const { created, duplicated, failed } = await this.userManageRepository.createUsers(userDtos);

    return { created, duplicated, failed };
  }

  // 注册
  async RegisterUser(createUserDto: CreateUserDto): Promise<InternalUserDto> {
    //验证用户存在性
    const haveUser = await this.verifyEmailExite(createUserDto.userEmail);
    // 创建用户
    if (Object.keys(haveUser).length > 0) {
      const user = await this.userManageRepository.createUser(createUserDto);
      // 转换数据
      const internalUser = plainToInstance(InternalUserDto, user, { excludeExtraneousValues: true });
      return internalUser;
    }
    throw new HttpException('User already exists', HttpStatus.CONFLICT);
  }


  // 单个查询
  async findOne(id: string): Promise<InternalUserDto | null> {
    const user = await this.userManageRepository.findWithAll(id.toString());
    if (user && Object.keys(user).length > 0) {
      return plainToInstance(InternalUserDto, user, { excludeExtraneousValues: true });
    }
    return null;
  }

  //通过邮箱单个查询
  async getUserByUserEmail(userEamil: string): Promise<InternalUserDto | null> {
    const user = await this.userManageRepository.findByEmail(userEamil);

    if (user && Object.keys(user).length > 0) {
      return plainToInstance(InternalUserDto, user, { excludeExtraneousValues: true });
    }
    return null;
  }

  //验证用户存在并返回用户信息 internalUserDto
  async validateUser(uEmail: string, inputPassword: string): Promise<InternalUserDto | null> {
    if (!uEmail || !inputPassword) {
      throw new HttpException('邮箱或密码不能为空', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userManageRepository.findByEmail(uEmail);
    console.log('user:', user);
    if (user && (await PasswordHelper.comparePassword(inputPassword, user.userPassword))) {
      //此时携带权限,转换为没有密码和salt属性的数据
      const internalUser = plainToInstance(InternalUserDto, user, { excludeExtraneousValues: true });

      //@todo缓存数据--基本信息和角色权限分离  抽取主要字段

      return internalUser;
    }
    console.log('账户密码不匹配');
    return null;
  }

  //验证存在email
  async verifyEmailExite(userEamil: string): Promise<boolean> {
    const user = await this.userManageRepository.findByEmail(userEamil);
    return null !== user;
  }

  //用户客户端查询个人用户信息包含角色权限和用户设置,以及所在的组织部门基本信息   
  async findUserInfoByUserId(userId:string):Promise<User | null>{
    const user= this.userManageRepository.findWithAll(userId)

    //@todo  进行信息过滤 这里的数据不包含密码  salt  {userEmail,userName,gender，department,Oraganization,avatar, borithday 。。。。。}
    return Object(user).keys().length>0 ?user: null


  }
}
