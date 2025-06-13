import { User } from '@user/entities/user.entity';
import { CreateUserDto } from '@user/dto/user/create-user.dto';
import { UpdateUserDto } from '@user/dto/user/update-user.dto';
import { UpdatePasswordDto } from '@user/dto/user/update-password.dto';
import { PaginatedResult } from 'src/common/types/paginatedResult.interface';

/**
 *@description 用户管理接口  
 接口说明：联合其他表  使用with+简写   查询统一find   修改：update   删除：delete  增加add

 *@interface create( createUser: CreateUserDto ): Promise<User>; //创建用户

 * @interface findWithRoleAndPermissionByUserId( userId: string ): Promise<User | null>; // id查询
 * @interface findWithOrgAndDepByUserId( userId: string ): Promise<User | null>; // id查询
 * @interface findWithAll( userId: string ): Promise<User | null>;   查询用户关联全部信息
 * @interface findByUserEmail(email: string): Promise<User | null>; //email查询
 * @interface findByUsername(username: string): Promise<User | null>; // userName查询

 * @interface update(params: { userId: string; user: UpdateUserDto }): Promise<void>; //基本信息修改包括删除用户
 * @interface updatePassword(params: { uId: string; upd: UpdatePasswordDto }): Promise<void>; //密码修改

 * @interface findAll(params: { page?: number; limit?: number; filters?: Partial<User> }): Promise<{ data: User[]; total: number }>; //查询所有用户  支持分页
 * @interface findByOrganizationId( organizationId: string ): Promise<User[]>; //按照组织查询用户
 * @interface findByDepartmentId( departmentId: string ): Promise<User[]>; //按照部门查询用户
  


*/
export interface IUserManageRepository {


  /**
   * @description  通过用户id查询用户信息 包含：用户基本信息   角色权限
   */
  findWithRoleAndPermissionByUserId(uId: string): Promise<User | null>; // id查询

  /**
   * @description  通过用户id查询用户信息 包含组织信息
   */

  findWithOrgAndDepByUserId(uid: string): Promise<User | null>

  /**
   * @description  通过用户id查询用户信息 包含组织信息  角色权限信息
   */

  findWithAll(uid: string): Promise<User | null>;


  /**
   * @description  通过用户邮箱查询用户信息 包含用户基本信息   角色全息  组织部门
   */
  findByEmail(uEmail: string): Promise<User | null>; //email查询

  /**
   * @description  通过用户名字查询用户信息 包含用户基本信息   角色全息  组织部门
   */
  findByUserName(uname: string): Promise<User | null>; // userName查询
  /**
   * @description  通过用户名字查询用户设置信息
   */
  findWithSettingByUserId(uname: string): Promise<User | null>; 

  /**
   * @description   创建用户
   */
  createUser(createdUse: CreateUserDto): Promise<User | null>;
  /**
   * @description  批量创建用户  暂时没有解决初始密码的问题
   */
  createUsers<T extends CreateUserDto | CreateUserDto[]>(
    input: T
  ): Promise<{
    created: T extends CreateUserDto[] ? User[] : User | null;
    duplicated: string[];
    failed: { data: CreateUserDto; reason: string }[];
  }>;

  

  // ==============更新用户信息========

  /**
   * @description  修改现有用户信息基本信息
   * @param userid: string
   * @param user:UpdateUserDto
   * @return void
   */
  update(params: { uId: string; user: UpdateUserDto }): Promise<User | null>; //基本信息修改包括删除用户

  /**
   * @description  修改现有用户密码 传入id newpass  oldpass
   */
  updatePassword(params: { uId: string; upd: UpdatePasswordDto }): Promise<void>; //密码修改

  //============批量查询===============

  /**
   * @description  查询所有用户-分页  过滤字段是user类的拥有的字段
   * @param page
   * @param limit
   * @param filter: Partical<User>
   */
  // findAll(params: { nextCursor:string, filters?: Partial<User> }): Promise<PaginatedResult<User>>; //查询所有用户  支持分页

  /**
   * @description 通过组织id查询所有用户基本信息
   * @param orgId :string
   * @return User[]
   */
  findByOrganizationId(orgId: string): Promise<User[] | []>; //按照组织查询用户

  /**
   * @description 通过部门id查询所有用户基本信息
   * @param depId :string
   * @return User[]
   */
  findByDepartmentId(depId: string): Promise<User[] | []>; //按照部门查询用户

 
}
