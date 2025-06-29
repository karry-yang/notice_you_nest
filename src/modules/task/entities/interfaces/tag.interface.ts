import { IManualAuditableBase } from 'src/common/shared/baseInterface/manualAuditableBase.interface';
import { PersonalTask } from '../personal-task.entity';
import { PersonalTaskTag } from '../personal-task-tag.entity';

//这类关联表在任务获取的时候主动获取tag类的数据  
export interface ITag extends IManualAuditableBase {
  tagId: string;
  tagTitle: string;
  tagColor: string;
  tagDescription: string;
  userId: string;
  parentId?:string;
  path: string | null;
  personalTaskTags?:PersonalTaskTag[]
}
