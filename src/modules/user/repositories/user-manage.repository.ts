import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '@user/entities/user.entity';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { IUserManageRepository } from './interfaces/user-manage.repository.interface';
import { UpdateUserDto } from '@user/dto/user/update-user.dto';
import { UpdatePasswordDto } from '@user/dto/user/update-password.dto';
import { generateSnowflakeId } from 'src/common/shared/lib/snowflake';
import { PasswordHelper } from 'src/common/shared/lib/password.helper';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * 处理用户的信息管理
 */
@Injectable()
export class UserManageRepository implements IUserManageRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly dataSource: DataSource
  ) {}
  findWithRoleAndPermissionByUserId(uId: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  async findWithOrgAndDepByUserId(uId: string): Promise<User | null> {
    // async findByDepartmentUserId(uId: string): Promise<Department | null> {
    const user = await this.dataSource
      .createQueryBuilder(User, 'user')
      .leftJoinAndSelect('user.Organization', 'org')
      .leftJoinAndSelect('org.leader', 'orgLeader')
      .leftJoinAndSelect('org.department', 'dep')
      .leftJoinAndSelect('dep.leader', 'leader')
      .leftJoinAndSelect('dep.user', 'user')
      .where('user.userId=:userId', { userId: uId })
      .getOne();
    return user || null;

    // }
  }
  findWithAll(uid: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  findWithSettingByUserId(uname: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }

  /**
   * @description 通过id查询
   */
  async findById(uId: string): Promise<User | null> {
    try {
      const user = await this.dataSource.createQueryBuilder().select('user').from(User, 'user').where('user.userId = :uId', { uId }).getOne();
      return user || null;
    } catch (error: unknown) {
      console.error('Error in findById:', error);
      return null;
    }
  }
  /**
   * @description 通过邮箱查询基本信息
   */
  async findByEmail(uEmail: string): Promise<User | null> {
    try {
      const user = await this.dataSource
        .createQueryBuilder(User, 'user')
        .addSelect(['user.userPassword', 'user.userSalt']) // 明确添加这两个字段
        .leftJoinAndSelect('user.userRoles', 'userRoles')
        .leftJoinAndSelect('userRoles.role', 'role')
        .leftJoinAndSelect('role.rolePermissions', 'rolePermission')
        .leftJoinAndSelect('rolePermission.permission', 'permission')
        .where('user.userEmail = :uEmail', { uEmail })
        .getOne();
      return user || null;
    } catch (error: unknown) {
      console.error('Error in findByEmail:', error);
      throw error;
    }
  }

  async findByUserName(uName: string): Promise<User | null> {
    try {
      const user = await this.dataSource.createQueryBuilder().select('user').from(User, 'user').where('user.username = :uName', { uName }).getOne();
      return user || null;
    } catch (error: unknown) {
      console.error('Error in findByUserName:', error);
      throw error;
    }
  }

  async update(params: { uId: string; user: UpdateUserDto }): Promise<User | null> {
    try {
      await this.dataSource.createQueryBuilder().update(User).set(params.user).where('userId = :uId', { uid: params.uId }).execute();
      const user = await this.findById(params.uId);
      return Object(user).keys().length > 0 ? user : null;
    } catch (error: unknown) {
      throw error;
    }
  }

  async updatePassword(params: { uId: string; upd: UpdatePasswordDto }): Promise<void> {
    try {
      await this.dataSource.createQueryBuilder().update(User).set({ userPassword: params.upd.newPassword }).where('userId = :uId', { uId: params.uId }).execute();
    } catch (error: unknown) {
      throw error;
    }
  }

  // async findAll(params: { page?: number; limit?: number; filters?: Partial<User> }): Promise<{ data: User[]; total: number }> {
  //   try {
  //     const { page = 1, limit = 10, filters = {} } = params;
  //     const queryBuilder = this.dataSource.createQueryBuilder().select('user').from(User, 'user');

  //     Object.entries(filters).forEach(([key, value]) => {
  //       if (value !== undefined) {
  //         queryBuilder.andWhere(`user.${key} = :${key}`, { [key]: value });
  //       }
  //     });

  //     const [data, total] = await queryBuilder
  //       .skip((page - 1) * limit)
  //       .take(limit)
  //       .getManyAndCount();

  //     return { data, total };
  //   } catch (error: unknown) {
  //     throw error;
  //   }
  // }

  async findByDepartmentId(depId: string): Promise<User[]> {
    try {
      return await this.dataSource.createQueryBuilder().select('user').from(User, 'user').where('user.departmentId = :depId', { depId }).getMany();
    } catch (error: unknown) {
      console.error('Error in findByDepartmentId:', error);
      throw error;
    }
  }

  async findByOrganizationId(orgId: string): Promise<User[]> {
    try {
      return await this.dataSource.createQueryBuilder().select('user').from(User, 'user').where('user.organizationId = :orgId', { orgId }).getMany();
    } catch (error: unknown) {
      console.error('Error in findByOrganizationId:', error);
      throw error;
    }
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    const userId = generateSnowflakeId();
    // const userSalt = await PasswordHelper.generateSalt();
    const hashedPassword = await PasswordHelper.hashPassword(userDto.userPassword);

    try {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          ...userDto,
          userId,
          // userSalt,
          userPassword: hashedPassword,
        })
        .execute();

      const user = await this.findById(userId);

      if (!user) {
        throw new Error('User creation failed: User not found after creation.');
      }

      return user;
    } catch (error: unknown) {
      throw error;
    }
  }

  async createUsers<T extends CreateUserDto | CreateUserDto[]>(
    input: T
  ): Promise<{
    created: T extends CreateUserDto[] ? User[] : User | null;
    duplicated: string[]; // 重复的邮箱列表
    failed: { data: CreateUserDto; reason: string }[]; // 插入失败的
  }> {
    const created: User[] = [];
    const duplicated: string[] = [];
    const failed: { data: CreateUserDto; reason: string }[] = [];

    const userInputs = Array.isArray(input) ? input : [input];

    // 获取所有 email
    const emails = userInputs.map((u) => u.userEmail);

    // 查询已存在的 email
    const existingUsers = await this.dataSource
      .createQueryBuilder()
      .select('user.userEmail')
      .from(User, 'user')
      .where('user.userEmail IN (:...emails)', { emails })
      .getRawMany<{ user_userEmail: string }>();

    const existingEmails = new Set(existingUsers.map((u) => u.user_userEmail));
    duplicated.push(...existingEmails);

    // 过滤掉重复的
    const toCreate = userInputs.filter((u) => !existingEmails.has(u.userEmail));

    const newUsers = await Promise.all(
      toCreate.map(async (userDto) => {
        try {
          const userId = generateSnowflakeId();
          // const salt = await PasswordHelper.generateSalt();
          const hashedPassword = await PasswordHelper.hashPassword(userDto.userPassword);

          return {
            ...userDto,
            userId,
            // userSalt: salt,
            userPassword: hashedPassword,
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : '生成密码失败';
          failed.push({ data: userDto, reason: errorMessage });
          return null;
        }
      })
    );

    const validUsers = newUsers.filter((u): u is User => !!u);

    // 插入数据库
    if (validUsers.length > 0) {
      try {
        await this.dataSource.createQueryBuilder().insert().into(User).values(validUsers).execute();
      } catch (error) {
        // 批量插入失败
        validUsers.forEach((u) => {
          failed.push({ data: u, reason: '数据库插入失败' });
        });
        console.error('Error during batch insert:', error);
        throw error; // Re-throw the error to handle it at a higher level
      }
    }

    // 查询成功插入的用户
    const createdUsers =
      validUsers.length > 0
        ? await this.dataSource
            .createQueryBuilder()
            .select('user')
            .from(User, 'user')
            .where('user.userId IN (:...ids)', {
              ids: validUsers.map((u) => u.userId),
            })
            .getMany()
        : [];

    created.push(...createdUsers);

    return {
      created: Array.isArray(input) ? (created as T extends CreateUserDto[] ? User[] : User | null) : ((created[0] ?? null) as T extends CreateUserDto[] ? User[] : User | null),
      duplicated,
      failed,
    };
  }

  //查询用户的全部信息  包括角色权限
}
