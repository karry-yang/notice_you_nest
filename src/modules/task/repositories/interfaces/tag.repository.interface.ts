import { CreateTagDto } from '@task/dto/tag/createTag.dto';
import { UpdateTagDto } from '@task/dto/tag/updateTag.dto';
import { Tag } from '@task/entities/tag.entity';
import { promises } from 'node:dns';

export interface ITagRepository {
  /**
   * @description 通过id查询标签 
   * 
   */
  findById(id: string): Promise<Tag | null>; //通过id查询

  /**
    //通过用户id查全部  进行父子分级别查询  
     * @description  
    */
  findByUserId(userId: string): Promise<Tag[]>; //通过用户id查询全部标签

  /**
   * @description  通过个人任务id查
   */
  findByTaskId(taskId: string): Promise<Tag[] | []>; //通过任务id查询全部标签

  /**
   * @description  创建新的标签
   */
  createTag(tagId:string,tag: CreateTagDto): Promise<Tag | null>; //增加

  /**
   * @description  修改先的标签
   */
  updateTag(tag: UpdateTagDto): Promise<Tag | null>; //修改


  //修改任务标签表
  updateTaskTag(userId:string,tagId?:string,taskId?:string):Promise<any>
  /**
   * @description  删除标签
   */
  deleteTag(tagId: string): Promise<Tag | null>; //删除
}
