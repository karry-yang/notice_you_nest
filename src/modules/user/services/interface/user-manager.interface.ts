import { CreateUserDto } from '@user/dto/user/create-user.dto';
import { InternalUserDto } from '@user/dto/user/internal-user.dto';
import { User } from '@user/entities/user.entity';
import { PaginatedResult } from 'src/common/types/paginatedResult.interface';

export interface IUserManageService {
  //批量添加用户
  batchCreateUsers(userDtos: CreateUserDto[]): Promise<any[]>;

  // 注册用户
  RegisterUser(createUserDto: CreateUserDto): Promise<InternalUserDto>;

  // 通过用户id查询用户信息
  findOne(id: string): Promise<InternalUserDto | null>;
  //通过邮箱查询用户信息
  findUserByUserEmail(userEamil: string): Promise<InternalUserDto | null>;

  //==========分页查询========
  //查询全部信息
  // findAll(nextCursor:{ useId:string } | null): Promise<PaginatedResult<InternalUserDto | null>>;

    //通过邮箱查找用户，验证存在 if true return internalUser  ；false retuen null
    validateUser(uEmail: string, inputPassword: string): Promise<InternalUserDto | null>;

    //验证邮箱存在email
    verifyEmailExite(userEamil: string): Promise<boolean>;
  
    //验证用户是否存在组织
    //验证用户是否存在组织中


    //个人信息查询
    findUserInfoByUserId(userId:string):Promise<User | null>
}
