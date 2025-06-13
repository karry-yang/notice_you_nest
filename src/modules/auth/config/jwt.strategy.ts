// auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CurrentUserDto } from 'src/common/dto/current-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {//PassportStrategy(Strategy, 'jwt') 注册策略
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'noticeyou',
    });
  }

  async validate(payload: any): Promise<CurrentUserDto> {
    return {
      userId: payload.userId, // 从 token 中提取 userId
      userEmail: payload.userEmail,
      username: payload.username,
      role: payload.role,
      organizationId: payload.organizationId,   // 如果 token 中有这些字段
      departmentId: payload.departmentId,
    };
  }
  
}
