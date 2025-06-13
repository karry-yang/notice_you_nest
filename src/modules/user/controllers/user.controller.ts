import { Controller, Get, Post, Body, Query, Inject } from '@nestjs/common';
import { UserManageService } from '@user/services/user/user-manage.service';
import { CreateUserDto } from '@user/dto/user/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MyApiResponse } from 'src/common/dto/api-response.dto';
import { ResponseUserDto } from '@user/dto/user/response-user.dto';
import { IUserManageServiceToken } from 'src/common/token/tokens';
import { IUserManageService } from '@user/services/interface/user-manager.interface';
import { error } from 'console';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    @Inject(IUserManageServiceToken)
    private readonly userManageService: IUserManageService
  ) {}

  //创建用户这能是组织管理 创建的用户归属该组织
  @Post()
  @ApiOperation({ summary: '创建用户' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userManageService.RegisterUser(createUserDto);
  }

//查看个人信息
async getUserInfo(userid:string):Promise<MyApiResponse<ResponseUserDto>>{
  //获取服务层方法  返回User实列
  const user =await this.userManageService.findUserInfoByUserId(userid)
  //过滤

  throw error
}
  
  //获取所有用户只能是系统管理
  // @Get('/user')
  // @ApiOperation({ summary: '系统关联获取所有用户' })
  // async findAll(@Query() currentPage: number, pageSize: number) {
  //   return this.userManageService.findAll(currentPage, pageSize);
  // }
}
