import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from './redis.service';
import { StartFocusDto } from 'src/modules/checkIn/dto/focus/startFocus.dto';

/**
 * @description 用于权限模块的用户注册/登录（登录暂时没有使用验证码模式）
 */
@Injectable()
export class RedisServiceForFocus extends RedisService {
  constructor(@Inject('REDIS_CLIENT_DB3') redisClient: Redis) {
    super(redisClient);
  }

  //获取专注key

  /**
   * @description 生成专注key
   * @param userId
   * @param habitId
   * @param  startFocus
   */
  private getFocusKey(userId: string, habitId: string): string {
    return `focus:${userId}:${habitId}`;
  }
  //开启专注 存入数据

  async setStartFocus(userId: string, startFocus: StartFocusDto): Promise<boolean> {
    const { habitTaskId } = startFocus;

    const value = JSON.stringify(startFocus);
    const key = this.getFocusKey(userId, habitTaskId);
    try {
      await this.set(key, value, 60 * 60 * 24);
      return true;
    } catch (e) {
      console.error('Error setting focus data:', e);
      return false;
    }
  }
  //结束专注  获取数据aa

  async getFocusData(userId: string, habitId: string): Promise<StartFocusDto | null> {
    const key = this.getFocusKey(userId, habitId);
    const data = await this.get(key);
    return data ? JSON.parse(data) : null; // 如果数据存在，解析为对象
  }
}
