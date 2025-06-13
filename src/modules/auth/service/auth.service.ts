import { Injectable, UnauthorizedException, BadRequestException, HttpException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { UserManageService } from '@user/services/user/user-manage.service';
import { AuthManageService } from '@user/services/auth/auth-manage.service';
import { CreateUserDto } from '@user/dto/user/create-user.dto';
import { RedisServiceForAuth } from '@database/redis/servers/forAuth.service';
import { generateVerificationCode } from 'src/common/shared/lib/generateVerificationCode';
import { MailService } from '@mail/mail.service';
import { IUserManageService } from '@user/services/interface/user-manager.interface';
import { IUserManageServiceToken } from 'src/common/token/tokens';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authManageService: AuthManageService,
    @Inject(IUserManageServiceToken)
    private readonly userManageService: IUserManageService,
    private readonly mailService: MailService,
    private readonly redisServiceForAuth: RedisServiceForAuth
  ) {}

  /**
   * @description 验证用户存在和密码正确  返回携带角色权限的用户数据
   */
  async validateUser(loginDto: LoginDto): Promise<any> {
    const { userEmail, password } = loginDto;
    const user = await this.userManageService.validateUser(userEmail, password);
    if (!user) {
      throw new UnauthorizedException('用户名或密码错误');
    }
    return user;
  }

  /**
   * @description    登录：传入payload参数生成 accessToken + refreshToken
   */

  async login(user: any) {
    const payload = {
      userId: user.id,
      userEmail: user.email,
      userName: user.username,
      role: user.role,
      organizationId: user.organizationId,
      departmentId: user.departmentId,
    };

    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  //注册
  async register(createUserDto: CreateUserDto): Promise<boolean> {
    try {
      // 尝试调用注册服务
      await this.userManageService.RegisterUser(createUserDto);
      return true
      //
    } catch (error) {
      // 如果是 HttpException 类型的错误，则抛出相同的错误
      if (error instanceof HttpException) {
        throw new HttpException(error.getResponse(), error.getStatus());
      }

      // 如果是数据库原始错误或其他类型的错误，输出错误日志
      console.error('注册失败:', error);

      // 根据错误类型返回具体错误信息
      const errorMessage = error instanceof Error ? error.message : '注册失败';

      // 抛出一个 400 错误并返回错误信息
      throw new BadRequestException(errorMessage);
    }
  }

  // ---------------------------
  // Token 生成与验证
  // ---------------------------

  generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCRESS_SECRET,
      expiresIn: '1h',
    });
  }

  generateRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
  }

  async verifyAccessToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCRESS_SECRET,
      });
    } catch (err) {
      console.error('Access token verification failed:', (err as Error).message);
      throw new UnauthorizedException('无效或过期的 access token');
    }
  }

  async verifyRefreshToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch (err) {
      console.error('Access token verification failed:', (err as Error).message);
      throw new UnauthorizedException('无效或过期的 refresh token');
    }
  }

  decodeAccessToken(token: string): any {
    return this.jwtService.decode(token);
  }

  decodeRefreshToken(token: string): any {
    return this.jwtService.decode(token);
  }

  //验证码生成
  async generateVerificationCode(userEmail: string): Promise<string | null> {
    console.log(userEmail);

    //首先验证是否再黑名单
    if (await this.redisServiceForAuth.isInBlackList(userEmail)) {
      throw new BadRequestException('验证码请求过于频繁，请稍后再试');
    }
    //获取验证码
    const verificationCodeObj = await this.redisServiceForAuth.hgetRegisterCode(userEmail);
    console.log(userEmail, verificationCodeObj);
    //空-> 表示第一次发起请求
    if (Object.keys(verificationCodeObj).length <= 0 || !verificationCodeObj) {
      //生成
      const newCode = generateVerificationCode();
      //写入redis
      await this.redisServiceForAuth.hsetRegisterCode(userEmail, newCode, 60);
      // 获取
      const code = await this.redisServiceForAuth.hgetRegisterCodeCode(userEmail);
      console.log('发送验证码中。。。。。', code);
      //发送
      if (code && code !== '') {
        await this.mailService.sendVerificationCode(userEmail, code);
      }
      return code;
    }
    // hava  判断再重新设定
    if (Object.keys(verificationCodeObj).length > 0 && verificationCodeObj.code && parseInt(verificationCodeObj.code) <= 3) {
      const newVerification = {
        ...verificationCodeObj,
        code: generateVerificationCode(),
      };

      await this.redisServiceForAuth.hReSetRegisterCodeCode(newVerification);
      return await this.redisServiceForAuth.hgetRegisterCodeCode(userEmail);
    }
    //次数超过三次:设置进入黑名单
    await this.redisServiceForAuth.setBlackList(userEmail);
    return null;
  }

  //邮箱验证存在性
  async verifyEmailExist(userEamil: string): Promise<boolean> {
    console.log(userEamil);
    //调用用户服务
    return await this.userManageService.verifyEmailExite(userEamil);
  }

  //验证码比较
  async compareVerifiCode(userEamil: string, verificode: string): Promise<boolean> {
    return verificode === (await this.redisServiceForAuth.hgetRegisterCodeCode(userEamil));
  }
}
