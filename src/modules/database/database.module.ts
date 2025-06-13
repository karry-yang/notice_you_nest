import { Module } from '@nestjs/common';
import { TypeOrmDatabaseModule } from './typeorm/typeorm.module';
import { RedisModule } from './redis/redis.module';
import { MongodbModule } from './mongodb/mongodb.module';

@Module({
  imports: [TypeOrmDatabaseModule, RedisModule, MongodbModule],
  exports: [TypeOrmDatabaseModule, RedisModule, MongodbModule],
})
export class DatabaseModule {}