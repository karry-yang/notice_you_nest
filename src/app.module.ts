import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { UserModule } from '@user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@auth/auth.module';
import { MailModule } from '@mail/mail.moudle';
import mailConfig from '@mail/config/mail.config'
import { TaskModule } from '@task/task.module';
import { CheckinModule } from './modules/checkIn/checkin.moduel';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
      load: [mailConfig], // 加载 mailConfig
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    MailModule,
    TaskModule,
    CheckinModule
  ],
  
})
export class AppModule {}
