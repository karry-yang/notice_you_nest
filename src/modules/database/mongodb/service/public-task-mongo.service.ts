// personal-task.mongo.ts
import { Injectable } from '@nestjs/common';
import { MongodbService } from '../mongodb.service';
import { PublicTaskDoc } from '../schemas/public-task.schema';
import { ObjectId } from 'typeorm';

@Injectable()
export class PublicTaskMongoService {
  constructor(private readonly mongo: MongodbService) {}

  async findByTaskId(taskId: string): Promise<PublicTaskDoc | null> {
    return this.mongo.findOne<PublicTaskDoc>('public_task', { taskId });
  }

  async findByObjectId(objectId: string): Promise<PublicTaskDoc | null> {
    return this.mongo.findOne<PublicTaskDoc>('public_task', { _id: new ObjectId(objectId) });
  }
  async insert(doc: PublicTaskDoc) {
    return this.mongo.insertOne<PublicTaskDoc>('public_task', doc);
  }

  // 你可以继续封装：update, delete, findMany, aggregate 等方法
}
