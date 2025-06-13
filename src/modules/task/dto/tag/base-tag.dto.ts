import { ApiProperty } from '@nestjs/swagger';
import { StatusEnum } from '@shared/enum/RowStatusEnum';
import { Expose, Transform } from 'class-transformer';
import { SimpleTag } from './simple-tag.dto';
import { Tag } from '@task/entities/tag.entity';

export class BaseTagDto {
  @ApiProperty({ description: '标签id' })
  @Expose({ name: 'tag_id' })
  tagId!: string;

  @ApiProperty({ description: '标签标题' })
  @Expose({ name: 'tag_title' })
  tagTitle!: string;

  @ApiProperty({ description: '标签颜色' })
  @Expose({ name: 'tag_color' })
  tagColor!: string;

  @ApiProperty({ description: '标签描述' })
  @Expose({ name: 'tag_description' })
  tagDescription!: string;

  @ApiProperty({ type: SimpleTag, description: '父级标签id' })
  @Transform(({ value }) =>
    value.map((t: Tag) => ({
      tagId: t.tagId,
      tagTitle: t.tagTitle,
      tagColor: t.tagColor,
    }))
  )
  parentTag?: SimpleTag;

  @ApiProperty({ description: '创建时间' })
  @Expose({ name: 'created_at' })
  createdAt!: Date;

  @ApiProperty({ description: '状态' })
  @Expose({ name: 'status' })
  status!: StatusEnum;

  @ApiProperty({ description: '创建人' })
  @Expose({ name: 'created_at' })
  createdBy!: string;
}
