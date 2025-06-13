import { Inject, Injectable } from '@nestjs/common';
import { ITagService } from './interface/tag-server.interface';
import { ITagRepositoryToken } from 'src/common/token/tokens';
import { ITagRepository } from '@task/repositories/interfaces/tag.repository.interface';
import { CreateTagDto } from '@task/dto/tag/createTag.dto';
import { UpdateTagDto } from '@task/dto/tag/updateTag.dto';
import { Tag } from '@task/entities/tag.entity';

@Injectable()
export class TagService implements ITagService {
  constructor(
    @Inject(ITagRepositoryToken)
    private readonly tagRep: ITagRepository
  ) {}
  async getTagsByUserId(userId: string): Promise<Tag[]> {
    const data = await this.tagRep.findByUserId(userId);
    return data;
  }
  async createTag(createTag: CreateTagDto): Promise<Tag | null> {
    const data = await this.tagRep.createTag(createTag);

    return data ?? null;
  }
  async updateTag(updateTag: UpdateTagDto): Promise<Tag | null> {
    const data = await this.tagRep.updateTag(updateTag);
    return data || null
  }
  delateTag(tagId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  //创建个人标签

  //查看个人标签
  //修改个人标签
}
