import { User } from '@iam/entities/user.entity';
import { CreateUserDto } from '../dto/user/create-user.dto';

export interface IUserRepository {

  //单个
  //创建用户
  create(userDto: CreateUserDto): Promise<User>;
  
  // 查询单个用户
  findOne(id: bigint): Promise<User>;
  

  //邮箱查找个人用户
  findByEmail(email: string): Promise<User | null>;

  // 根据用户名查询用户
  findByUsername(username: string): Promise<User>;
  
  // 更新用户信息
  // 注意：这里的 user 是部分更新，所以使用 Partial<User>
  // Partial<User> 允许传入 User 的部分属性进行更新
  update(id: bigint, user: Partial<User>): Promise<void>;
 
  // 删除用户
  remove(id: bigint): Promise<void>;



  //所有
    //查询所有用户  支持分页
    findAll(): Promise<User[]>;


  //按照组织查询用户
  findByOrganizationId(organizationId: bigint): Promise<User[]>;
  
  //按照部门查询用户
  findByDepartmentId(departmentId: bigint): Promise<User[]>;

}
