// personal-task.mongo.ts
import { Injectable } from '@nestjs/common';
import { MongodbService } from '../mongodb.service';
import { PersonalTaskDoc } from '../schemas/personal-task.schema';
import { ObjectId } from 'typeorm';

@Injectable()
export class PersonalTaskMongoService {
  constructor(private readonly mongo: MongodbService) {}

  //   async findByField(field: 'taskId' | '_id', value: string): Promise<PersonalTaskDoc | null> {
  //     const query = { [field]: field === '_id' ? new ObjectId(value) : value };
  //     return this.mongo.findOne<PersonalTaskDoc>('personal_task', query);
  //   }
  async findByTaskId(taskId: string): Promise<PersonalTaskDoc | null> {
    return this.mongo.findOne<PersonalTaskDoc>('personal_task', { taskId });
  }

  async findByObjectId(objectId: string): Promise<PersonalTaskDoc | null> {
    return this.mongo.findOne<PersonalTaskDoc>('personal_task', { _id: new ObjectId(objectId) });
  }
  async insert(doc: PersonalTaskDoc) {
    return this.mongo.insertOne<PersonalTaskDoc>('personal_task', doc);
  }
  async updateByTaskId(taskId: string, content: PersonalTaskDoc['content']): Promise<void> {
    await this.mongo.getCollection<PersonalTaskDoc>('personal_task').updateOne(
      { taskId },
      {
        $set: {
          content,
          updatedAt: new Date(),
        },
      }
    );
  }
  // 你可以继续封装：update, delete, findMany, aggregate 等方法
}
