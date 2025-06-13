import { Injectable, Inject } from '@nestjs/common';
import { Db, Collection, Filter, InsertOneResult, Document, OptionalUnlessRequiredId } from 'mongodb';
import { IMongoDBService } from './mongodb.interface';

@Injectable()
export class MongodbService implements IMongoDBService {
  constructor(
    @Inject('MONGODB_CLIENT')
    private readonly db: Db
  ) {}

  getCollection<T extends Document>(name: string): Collection<T> {
    return this.db.collection(name);
  }

  getDb(): Db {
    return this.db;
  }

  async findOne<T extends Document>(collectionName: string, query: Filter<T>): Promise<T | null> {
    const result = await this.db.collection<T>(collectionName).findOne(query);
    return result as T | null;
  }

  async insertOne<T extends Document>(collectionName: string, doc: OptionalUnlessRequiredId<T>): Promise<InsertOneResult<T>> {
    return this.db.collection<T>(collectionName).insertOne(doc);
  }
}
