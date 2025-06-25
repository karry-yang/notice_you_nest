import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoClient, Db } from 'mongodb';
import { MongodbService } from './mongodb.service';
import { PersonalTaskMongoService } from './service/personal-task-mongo.service';
import { PublicTaskMongoService } from './service/public-task-mongo.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'MONGODB_CLIENT',
      useFactory: async (config: ConfigService): Promise<Db> => {
        const mongoUri = config.get<string>('MONGO_URI');
        if (!mongoUri) {
          throw new Error('MONGO_URI is not defined in the configuration');
        }
        const client = await MongoClient.connect(mongoUri);
        return client.db(config.get('MONGO_DB_NAME'));
      },
      inject: [ConfigService],
    },
    MongodbService,
    PersonalTaskMongoService,
    PublicTaskMongoService,
  ],
  exports: [MongodbService, PersonalTaskMongoService, PublicTaskMongoService],
})
export class MongodbModule {}
