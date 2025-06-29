import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from './redis.service';
import { StartFocusDto } from 'src/modules/checkIn/dto/focus/startFocus.dto';
import { an } from '@faker-js/faker/dist/airline-BUL6NtOJ';
import { DetailPersonalTaskDto } from '@task/dto/personalTask/detail-personal-task.dto';

/**
 * @description 用于个人任务的保存
 */
@Injectable()
export class RedisServiceForPersonalTask {
  constructor(@Inject('REDIS_CLIENT_DB2') private readonly redisClient: Redis) {}

  private getPersonalDeleteKey(userId: string): string {
    return `${userId}:personal_task:deleted`;
  }

  //最近删除的
  async addDeletedTask(userId: string, taskIds: string[], ttlSeconds = 86400) {
    const expireAt = Math.floor(Date.now() / 1000) + ttlSeconds;
    const promises = taskIds.map((taskId) => this.redisClient.zadd(this.getPersonalDeleteKey(userId), expireAt, taskId));
    await Promise.all(promises);
  }

  //获取最近删除的任务id
  //返回的是有效的删除任务id
  //过期的任务id会被过滤掉
  // async getDeletedTaskIds(userId: string): Promise<string[]> {
  //   const now = Math.floor(Date.now() / 1000);
  //   const deletedTaskIds = await this.redisClient.zrangebyscore(this.getPersonalDeleteKey(userId), '-inf', now);
  //   // 过滤掉过期的任务id
  //   return deletedTaskIds.filter((taskId) => taskId !== null && taskId !== undefined);
  // }

  //获取删除的过期的数据 每次获取过期任务的时候 可以触发手动删除

  async getHasDeletedTaskIds(userId: string): Promise<string[]> {
    const now = Math.floor(Date.now() / 1000);
    const deletedTaskIds = await this.redisClient.zrangebyscore(this.getPersonalDeleteKey(userId), now, '+inf');
    // 过滤掉过期的任务id
    return deletedTaskIds.filter((taskId) => taskId !== null && taskId !== undefined);
  }

  async removeDeletedTaskIds(userId: string, taskIds: string[]): Promise<string[]> {
    if (!taskIds?.length) return [];

    try {
      const pipeline = this.redisClient.pipeline();
      for (const taskId of taskIds) {
        pipeline.zrem(this.getPersonalDeleteKey(userId), taskId);
      }

      const results = await pipeline.exec();

      if (!results || !Array.isArray(results)) {
        console.warn(`[Redis删除警告] pipeline.exec 返回异常，userId=${userId}`);
        return [];
      }

      const deletedIds: string[] = [];
      results.forEach(([err, res]: [Error | null, unknown], index) => {
        if (err) {
          console.warn(`[Redis删除警告] taskId=${taskIds[index]} 删除失败`, err);
          return;
        }
        if (typeof res === 'number' && res > 0) {
          deletedIds.push(taskIds[index]);
        }
      });

      return deletedIds;
    } catch (err) {
      console.warn(`[Redis删除异常] userId=${userId} taskIds=${taskIds.join(',')}`, err);
      // 这里不抛出异常，保证调用端不会中断
      return [];
    }
  }

  async getValidDeletedTaskIds(userId: string): Promise<string[]> {
    const now = Math.floor(Date.now() / 1000);
    return this.redisClient.zrangebyscore(this.getPersonalDeleteKey(userId), now, '+inf');
  }

  async cleanExpiredTasks(userId: string): Promise<void> {
    const now = Math.floor(Date.now() / 1000);
    await this.redisClient.zremrangebyscore(this.getPersonalDeleteKey(userId), 0, now);
  }

  private getHotPersonalTaskIdsKey(userId: string): string {
    return `${userId}:personal_task_id:hot`;
  }

  private getHotPersonalTaskcontentKey(userId: string, taskId: string): string {
    return `${userId}:hot:personal_task_content:${taskId}`;
  }
  private getHotPersonalTaskMarkDownKey(userId: string, taskId: string): string {
    return `${userId}:hot:personal_task_Markdown:${taskId}`;
  }

  //设置热点id列表
  async setHotPersonalTasksList(userId: string, taskId: string): Promise<void> {
    const idKey = this.getHotPersonalTaskIdsKey(userId);
    await this.redisClient.lrem(idKey, 0, taskId);
    await this.redisClient.lpush(idKey, taskId);
    await this.redisClient.ltrim(idKey, 0, 49);
  }
  //设置基本内容缓存
  async setHotPersonalTaskContent(userId: string, taskId: string, content: any): Promise<void> {
    const key = this.getHotPersonalTaskcontentKey(userId, taskId);
    await this.redisClient.set(key, JSON.stringify(content), 'EX', 3600);
  }
  //获取
  async getHotPersonalTaskContent(userId: string, taskId: string): Promise<any> {
    const key = this.getHotPersonalTaskcontentKey(userId, taskId);
    return await this.redisClient.get(key);
  }

  //设置文版缓存
  async setHotPersonalTaskMarkdown(userId: string, taskId: string, markDown: any): Promise<void> {
    const key = this.getHotPersonalTaskMarkDownKey(userId, taskId);
    await this.redisClient.set(key, markDown, 'EX', 1800);
  }
  //查询文版缓存
  async getHotPersonalTaskMarkdown(userId: string, taskId: string): Promise<any> {
    const key = this.getHotPersonalTaskMarkDownKey(userId, taskId);
    return await this.redisClient.get(key);
  }

  //获取个人热点
  async getHotPersonalTasks(userId: string): Promise<any[]> {
    const idList = await this.redisClient.lrange(this.getHotPersonalTaskIdsKey(userId), 0, -1);

    const contentKeys = idList.map((id) => this.getHotPersonalTaskcontentKey(userId, id));
    const markdownKeys = idList.map((id) => this.getHotPersonalTaskMarkDownKey(userId, id));

    const [contents, markdowns] = await Promise.all([this.redisClient.mget(...contentKeys), this.redisClient.mget(...markdownKeys)]);

    return idList.map((taskId, idx) => {
      const contentJson = contents[idx];
      const markdownText = markdowns[idx];

      if (!contentJson) {
        return { taskId, expired: true };
      }

      let parsedContent: any;
      try {
        parsedContent = JSON.parse(contentJson);
      } catch {
        return { taskId, error: 'Invalid JSON content' };
      }

      return {
        taskId,
        ...parsedContent,
        ...(markdownText ? { markdown: markdownText } : {}),
      };
    });
  }
  private getHotPersonalTaskUpdateIdsKey(userId: string): string {
    return `${userId}:personal_task_id:updated`;
  }
  //设置最近修改的数据
  async setUpdatedPersonalTasksList(userId: string, taskId: string): Promise<void> {
    const idKey = this.getHotPersonalTaskUpdateIdsKey(userId);
    await this.redisClient.lrem(idKey, 0, taskId);
    await this.redisClient.lpush(idKey, taskId);
    await this.redisClient.ltrim(idKey, 0, 49);
  }
  private getHotPersonalTaskCreatedIdsKey(userId: string): string {
    return `${userId}:personal_task_id:created`;
  }
  //设置最近添加的数据
  async setCreatedPersonalTasksList(userId: string, taskId: string): Promise<void> {
    const idKey = this.getHotPersonalTaskCreatedIdsKey(userId);
    await this.redisClient.lrem(idKey, 0, taskId);
    await this.redisClient.lpush(idKey, taskId);
    await this.redisClient.ltrim(idKey, 0, 49);
  }

  //分层分页任务缓存  不保存任务的markdown 只需要保存任务id和基本数据
  //获取分层任务key
  private getPersonalTaskLevelListKey(userId: string, parentId: string | null, level: number): string {
    return `userid:${userId}:parentId:${parentId ?? '_root_'}:level:${level}`;
  }
  //设置层级任务的缓存
  async setPersonalTaskLevelListBatch(userId: string, level: number, parentId: string | null, items: DetailPersonalTaskDto[]): Promise<void> {
    const pipeline = this.redisClient.pipeline();
    //时间转换成数字
    const cacheData = items.map((task) => ({
      ...task,
      createdAt: Math.floor(new Date(task.createdAt).getTime()), // 毫秒级时间戳
    }));
    for (const item of cacheData) {
      const key = this.getPersonalTaskLevelListKey(userId, parentId, level);
      pipeline.zadd(key, item.createdAt, JSON.stringify(item));
    }

    await pipeline.exec();
  }

  //设置缓存基本数据  前端点击任务  会保存在hot中

  //获取整个层级数据或者大于时间错的数据
  // 获取整个层级数据，或者指定时间区间的数据
  async getPersonalTaskTree(userId: string, parentId: string | null, level: number, startTime?: string | number, endTime?: string | number): Promise<any[]> {
    const key = this.getPersonalTaskLevelListKey(userId, parentId, level);

    // 设置默认值，如果没有传时间，则取整个区间
    const min = toTimestampForRedis(startTime);
    const max = endTime ? toTimestampForRedis(endTime).toString() : '+inf';

    const raw = await this.redisClient.zrangebyscore(key, `(${min}`, max);

    return raw.map((json) => JSON.parse(json));
  }
  //清除用户id下所有的层级任务缓存
  //首先获取userid下的所有满足userid:${userId}:xxx的缓存数据
  async clearPersonalTaskLevelListBatch(userId: string): Promise<void> {
    const pattern = `userid:${userId}:parentId:*:level:*`;
    // 使用SCAN命令遍历所有匹配的键
    let cursor = '0';
    do {
      const [nextCursor, keys] = await this.redisClient.scan(cursor, 'MATCH', pattern, 'COUNT', '100');
      cursor = nextCursor;

      if (keys.length > 0) {
        await this.redisClient.del(...keys);
      }
    } while (cursor !== '0');
  }

  //删除
}
