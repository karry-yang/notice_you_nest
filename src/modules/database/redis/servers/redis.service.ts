import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { IRedisService } from './redis.interface';

@Injectable()
export class RedisService implements IRedisService {
  constructor(
    // @Inject('REDIS_CLIENT')
    private readonly redisClient: Redis
  ) {}
  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
  async hset(key: string, field: string, value: string): Promise<void> {
    await this.redisClient.hset(key, field, value);
  }

  async hget(key: string, field: string): Promise<string | null> {
    return this.redisClient.hget(key, field);
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    await this.redisClient.set(key, value);
    if (ttl) await this.redisClient.expire(key, ttl);
  }

  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async hgetall(key: string): Promise<any> {
    return this.redisClient.hgetall(key);
  }

  async setMulti(key: string, data: Record<string, string> | string[], ttlSeconds?: number): Promise<void> {
    const multi = this.redisClient.multi();

    if (Array.isArray(data)) {
      for (const value of data) {
        multi.hset(key, value, value);
      }
    } else {
      for (const [field, value] of Object.entries(data)) {
        multi.hset(key, field, value);
      }
    }

    if (ttlSeconds) {
      multi.expire(key, ttlSeconds);
    }

    await multi.exec();
  }
}
