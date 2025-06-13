import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IListService } from '@task/services/interface/listicle-server.interface';
import e from 'express';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { MyApiResponse } from 'src/common/dto/api-response.dto';
import { CurrentUserDto } from 'src/common/dto/current-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { IListicleServiceToken } from 'src/common/token/tokens';

@ApiTags('lisicle请求服务')
@Controller('listicle')
export class ListicleController {
  constructor(
    @Inject(IListicleServiceToken)
    private readonly ListicleService: IListService
  ) {}

  //获取用户所有的标签

  @Get('get-all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('USER')
  @ApiOperation({ summary: '获取用户所有的标签', description: '获取用户所有的标签 用于分类公开任务   也会获取用户所在部门的公共标签' })
  @ApiResponse({ status: 200, description: '查询成功' })
  async getUserAllListice(@CurrentUser('userId') userId: string): Promise<MyApiResponse> {
    const data = await this.ListicleService.getListicleByUserId(userId);
    if (data.length <= 0) return MyApiResponse.error('查询失败,没有数据', 400, null);
    return MyApiResponse.success(data, '查询成功', 200);
  }
}
