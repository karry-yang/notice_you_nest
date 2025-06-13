import { ManualAuditableBase } from 'src/common/shared/baseEntity/manualAuditable.entity';
import { ITag } from './interfaces/tag.interface';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PersonalTask } from './personal-task.entity';
import { PersonalTaskTag } from './personal-task-tag.entity';

@Entity('tag')
export class Tag extends ManualAuditableBase implements ITag {
  @PrimaryColumn({ name: 'tag_id', type: 'bigint', comment: '标签id-主键' })
  tagId!: string;

  @Column({ name: 'tag_title', type: 'varchar', length: 20, nullable: false, comment: '标签名字' })
  tagTitle!: string;

  @Column({ name: 'tag_color', type: 'varchar', length: 10, nullable: false, comment: '标签颜色，十六进制字符串，如 #FF0000' })
  tagColor!: string;

  @Column({ name: 'tag_description', type: 'varchar', length: 50, nullable: true, comment: '标签描述' })
  tagDescription: string = '';

  @Column({ name: 'user_id', type: 'bigint', nullable: false, comment: '标签归属的用户id' })
  userId!: string;

  @Column({ name: 'parent_id', type: 'bigint', default: null, comment: '父级别标签id' })
  parentId?: string;

  @OneToMany(() => PersonalTaskTag, (personalTaskTag) => personalTaskTag.tag)
  personalTaskTags?: PersonalTaskTag[];
}
