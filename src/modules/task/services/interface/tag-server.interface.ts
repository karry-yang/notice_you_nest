import { CreateTagDto } from '@task/dto/tag/createTag.dto';
import { UpdateTagDto } from '@task/dto/tag/updateTag.dto';
import { Tag } from '@task/entities/tag.entity';


export interface ITagService {
  /**
   * @description 查询个人全部标签
   */
  getTagsByUserId(userId: string): Promise<Tag[] | []>;

  /**
   * @description     新建标签
   */
  createTag(createTag: CreateTagDto): Promise<Tag | null>;

  /**
   * @description     修改标签
   */
  updateTag(updateTag: UpdateTagDto): Promise<Tag | null>;

  /**
   * @description     删除标签
   */
  delateTag(tagId: string): Promise<boolean>;
}
