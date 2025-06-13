import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { RedisService } from './servers/redis.service';
import { RedisServiceForAuth } from './servers/forAuth.service';
import { RedisServiceForFocus } from './servers/forFocus.service';
@Module({
  imports: [ConfigModule],
  providers: [
    //验证码
    {
      provide: 'REDIS_CLIENT_DB0',
      useFactory: (config: ConfigService) =>
        new Redis({
          host: config.get('REDIS_HOST'),
          port: config.get('REDIS_PORT'),
          password: config.get('REDIS_PASSWORD'),
          db: 0,
        }),
      inject: [ConfigService],
    },
    //用户信息
    {
      provide: 'REDIS_CLIENT_DB1',
      useFactory: (config: ConfigService) =>
        new Redis({
          host: config.get('REDIS_HOST'),
          port: config.get('REDIS_PORT'),
          password: config.get('REDIS_PASSWORD'),
          db: 1,
        }),
      inject: [ConfigService],
    },
    //任务信息
    {
      provide: 'REDIS_CLIENT_DB2',
      useFactory: (config: ConfigService) =>
        new Redis({
          host: config.get('REDIS_HOST'),
          port: config.get('REDIS_PORT'),
          password: config.get('REDIS_PASSWORD'),
          db: 2,
        }),
      inject: [ConfigService],
    },
    //专注
    {
      provide: 'REDIS_CLIENT_DB3',
      useFactory: (config: ConfigService) =>
        new Redis({
          host: config.get('REDIS_HOST'),
          port: config.get('REDIS_PORT'),
          password: config.get('REDIS_PASSWORD'),
          db: 3,
        }),
      inject: [ConfigService],
    },
    RedisServiceForAuth,
    RedisServiceForFocus
  ],
  exports: [RedisServiceForAuth,RedisServiceForFocus],
})
export class RedisModule {}
