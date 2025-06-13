import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoClient, Db } from 'mongodb';
import { MongodbService } from './mongodb.service';

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
  ],
  exports: [MongodbService],
})
export class MongodbModule {}