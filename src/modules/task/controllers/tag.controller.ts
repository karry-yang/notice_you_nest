import { Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ITagService } from '@task/services/interface/tag-server.interface';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { MyApiResponse } from 'src/common/dto/api-response.dto';
import { ITagServiceToken } from 'src/common/token/tokens';
@ApiTags('tag请求服务')
@Controller('/tag')
export class TagController {
  constructor(
    @Inject(ITagServiceToken)
    private readonly tagService: ITagService
  ) {}
  //获取个人全部标签
  async getTagsByUserId(@CurrentUser('userId') userId: string): Promise<MyApiResponse> {
    const data = await this.tagService.getTagsByUserId(userId);
    if (data) return MyApiResponse.success(data, '标签查询成功', 200);
    else {
      return MyApiResponse.error('查询失败');
    }
  }
}
