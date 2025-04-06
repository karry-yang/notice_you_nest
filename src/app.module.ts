import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/database.module';
import { UserModule } from '@iam/user.module';
import { join } from 'path';
import { LoggingModule } from '@logging/logging.module';
@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: [
    //     join(__dirname, '..', '.env.local'), // 优先使用.env.local
    //     join(__dirname, '..', '.env'), // 后备使用.env
    //   ],
    // }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV ?? 'local'}`,
    }),
    DatabaseModule,
    UserModule,
    LoggingModule,
  ],
})
export class AppModule {}
