import { Tag } from '@task/entities/tag.entity';
import { ITagRepository } from './interfaces/tag.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PersonalTaskTag } from '@task/entities/personal-task-tag.entity';

export class TagReporisitory implements ITagRepository {
  constructor(
    @InjectRepository(Tag)
    private readonly publicTaskRepository: Repository<Tag>,
    private readonly dataSource: DataSource
  ) {}
    async findById(id: string): Promise<Tag | null> {
    // const data = this.dataSource.createQueryBuilder(PersonalTaskTag, 'pt').leftJoinAndSelect('pt.personalTask', 'task').leftJoin('pt.tag', 'tag').where('tag.tagId=:tagId', { tagId: id }).getMany();

    const data =   await this.dataSource.query(`
      WITH RECURISICE  task_tree AS(
      SELECT *,0 AS depth FROM personal_task  WHERE parent_id IS NULL
      LEFT JOIN 
      )
      `,[id])
    throw new Error('Method not implemented.');
  }
  async findByUserId(userId: string): Promise<Tag[]> {
    // const data= await  this.dataSource.createQueryBuilder(Tag,'tag').where('tag.userId=:userId',{userId:userId}).getMany()
    const data = await this.dataSource.query(
      `WITH RECURSIVE tag_tree AS (
  SELECT *, 0 AS depth FROM tag WHERE user_id = ? AND parent_id IS NULL
  UNION ALL
  SELECT t.*, tt.depth + 1 FROM tag t
  INNER JOIN tag_tree tt ON t.parent_id = tt.tag_id
)
SELECT * FROM tag_tree;
`,
      [userId]
    );
    return data;
  }
  findByTaskId(taskId: string): Promise<Tag[] | []> {
    throw new Error('Method not implemented.');
  }
  createTag(tagId:string,tag: Tag): Promise<Tag | null> {
    throw new Error('Method not implemented.');
  }
  updateTag(tag: Tag): Promise<Tag | null> {
    throw new Error('Method not implemented.');
  }
  updateTaskTag( userId:string, tagId?: string, taskId?: string): Promise<any> {
    const condition=``
  if(tagId){

  }
  const  sql= ''
    throw new Error('')
  }
  deleteTag(tagId: string): Promise<Tag | null> {
    throw new Error('Method not implemented.');
  }
}
