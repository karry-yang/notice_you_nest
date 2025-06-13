// auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Get, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateUserDto } from '@user/dto/user/create-user.dto';
import { RegisterDto } from '@auth/dto/register.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { MyApiResponse } from 'src/common/dto/api-response.dto';
import { AuthLoginRequestDto } from '@auth/dto/auth-login-request.dto';
import { RedisServiceForAuth } from '@database/redis/servers/forAuth.service';
import { VerificationDto } from '@auth/dto/verification-req.dto';

@ApiTags('auth模块请求')
@Public()
@Controller('public')
export class PublicController {
  //auth服务注册
  constructor(
    private readonly authService: AuthService,
    //缓存服务注册 db0
    // private readonly redisClientDB0: RedisServiceForAuth
  ) {}

  @Post('login')
  @ApiOperation({ summary: '用户登录（支持账号密码或刷新 token)' })
  @ApiBody({ type: AuthLoginRequestDto })
  @ApiResponse({ status: 200, description: '登录成功，返回 token 信息' })
  @ApiResponse({ status: 400, description: '缺少登录信息,没有logindto也没有refreshtoken' })
  @ApiResponse({ status: 401, description: '登录失败或 refreshToken 无效' })
  /**
   * @description 登录请求
   */
  //首次登录
  @Post('login')
  @Public()
  async login(@Body() req: AuthLoginRequestDto): Promise<MyApiResponse> {
    console.log(req)
    // 1. 仅提供 refreshToken：刷新 accessToken
    if (req.refreshToken && !req.loginDto) {
      try {
        const user = await this.authService.verifyRefreshToken(req.refreshToken);
        const accessToken = this.authService.generateAccessToken(user);
        console.log('登录成功')
        return MyApiResponse.success({ accessToken }, '登录成功');
      } catch (error) {
        console.error('Error verifying refresh token:', error);
        return MyApiResponse.error('Invalid refresh token', 401, null);
      }
    }
    // 2. 提供 loginDto（无论是否同时有 refreshToken，都优先走账号密码登录）
    if (req.loginDto || (req.loginDto && req.refreshToken)) {

      
      const user = await this.authService.validateUser(req.loginDto);
      const token = await this.authService.login(user);
      return MyApiResponse.success(token, '登录成功');
    }

    // 3. 请求不合法（两者都没有）
    return MyApiResponse.error('错误请求：缺少登录信息', 400);
  }

  @Post('register')
  @ApiOperation({ summary: '用户注册，无需权限' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 200, description: '注册成功' })
  @ApiResponse({ status: 400, description: '验证码错误' })
  @ApiResponse({ status: 500, description: '注册失败' })
  @Public()
  async register(@Body() req: RegisterDto): Promise<MyApiResponse> {
    console.log('createUserDto:', req);

    // 解析数据
    const createUserDto: CreateUserDto = {
      userEmail: req.userEmail,
      userName: req.userName,
      userPassword: req.userPassword,
      userPhone: req.userPhone,
      userGender: req.userGender,
      organizationCode: req.organizationCode ?? '',
    };

    // 获取验证码并比较
    const captcha = await this.authService.compareVerifiCode(req.userEmail,req.captcha);
    if (captcha ) {
      try {
        // 调用注册服务
        await this.authService.register(createUserDto);
        return MyApiResponse.success(null, '注册成功', 200);
      } catch (error) {
        // 错误处理（如用户已存在等）
        console.error('注册失败:', error);
        return MyApiResponse.error('注册失败，可能是用户已存在', 500);
      }
    } else {
      // 验证码错误
      return MyApiResponse.error('验证码错误', 400);
    }
  }

  //刷新新的refreshtoken  返回新的accesstoken
  //ps:修改了数据库中和paload中非userpassword属性的情况下，应该删除前端保存的accessstoken+refreshtoen  触发重新登录
  @Post('refresh-accessToken')
  @ApiOperation({ summary: '通过refreshtoken  刷新accesstoken，无需权限' })
  @ApiBody({ type: Object })
  @ApiResponse({ status: 200, description: '注册成功' })
  @Public()
  async refreshToken(@Body() body: { refreshToken: string }): Promise<MyApiResponse> {
    //验证refreshtoken的有效性
    //if有效 返回paload
    //无效 返回error 401
    const user = await this.authService.verifyRefreshToken(body.refreshToken);
    if (!user) {
      throw new UnauthorizedException('用户refreshtoken无效,无法继承获取accesstoken');
    }
    const accessToken = this.authService.generateAccessToken(user);
    return MyApiResponse.success(accessToken,"刷新成功",200)
  }




  //生成注册验证码
  @Post('getCaptcha')
  @ApiOperation({ summary: '注册时生成验证码' })
  @ApiBody({ type: VerificationDto })
  @ApiResponse({ status: 200, description: '成功生成验证码' })
  @ApiResponse({ status: 400, description: '用户存在' })
  @Public()
  async verificationCode(@Body() req: VerificationDto): Promise<MyApiResponse> {
    console.log(req)
    //调用用户服务验证用户存在
    if (await this.authService.verifyEmailExist(req.userEmail)) {
      //if true
      return MyApiResponse.error('用户存在', 400, null);
    }
    //if false
    //调用服务层 验证码生成接口

   const code = await this.authService.generateVerificationCode(req.userEmail);
    console.log(code)
    //邮箱发送
    return MyApiResponse.success(null, '验证码发送', 200);
  }


  //查看权限
  

  
}
