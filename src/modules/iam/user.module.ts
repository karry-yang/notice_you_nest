import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user/user.entity';
import { UserLog, UserLogSchema } from './entities/user-log.entity';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // MySQL实体
    MongooseModule.forFeature([{ name: UserLog.name, schema: UserLogSchema }]), // MongoDB模型
    RedisModule, // 确保Redis模块已导入
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'IUserRepository', // 必须与@Inject('IUserRepository')匹配
      useClass: UserRepository, // 您的Repository实现类
    },
  ],
  exports: [UserService],
})
export class UserModule {}
