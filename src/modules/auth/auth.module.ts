// auth/auth.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './service/auth.service';
// import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './config/jwt.strategy';
import { UserModule } from '@user/user.module';
import { MailModule } from '@mail/mail.moudle';
import { PublicController } from './controller/public-auth.controller';
import { RedisModule } from '@database/redis/redis.module';
import { MailService } from '@mail/mail.service';
import { AuthManageService } from '@user/services/auth/auth-manage.service';
import { IAuthManageServiceToken, IUserManageServiceToken } from 'src/common/token/tokens';
import { UserManageService } from '@user/services/user/user-manage.service';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'noticeyou',
      signOptions: { expiresIn: '3600s' },
    }),
    forwardRef(()=>UserModule),
    RedisModule,
    MailModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    MailService,
    {
      provide: AuthManageService, // 👈 不能用 useClass，而是 useExisting 绑定 token
      useExisting: IAuthManageServiceToken,
    },
    {
      provide: UserManageService,
      useExisting: IUserManageServiceToken,
    },
  ],
  controllers: [PublicController],
})
export class AuthModule {}
