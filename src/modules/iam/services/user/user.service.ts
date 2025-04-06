import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserLog } from '../entities/user-log.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository, // 必须与provider的token一致

    @InjectRedis()
    private readonly redis: Redis, // Redis装饰器

    @InjectModel(UserLog.name)
    private readonly userLogModel: Model<UserLog> // Mongoose模型
  ) {}

  async create(createUserDto: CreateUserDto) {
    // 检查用户名是否已存在
    const existingUser = await this.userRepository.findByUsername(createUserDto.username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // 创建用户
    const user = await this.userRepository.create(createUserDto);

    // 记录日志到MongoDB
    await this.userLogModel.create({
      userId: user.id,
      action: 'CREATE_USER',
      details: `User ${user.username} created`,
    });

    // 缓存用户数据到Redis
    await this.redis.set(`user:${user.id}`, JSON.stringify(user), 'EX', 3600);

    return user;
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: number) {
    // 先从Redis获取
    const cachedUser = await this.redis.get(`user:${id}`);
    if (cachedUser) {
      return JSON.parse(cachedUser);
    }

    // Redis中没有则从数据库获取
    const user = await this.userRepository.findOne(id);
    if (user) {
      await this.redis.set(`user:${id}`, JSON.stringify(user), 'EX', 3600);
    }

    return user;
  }

  // 其他服务方法...
}
