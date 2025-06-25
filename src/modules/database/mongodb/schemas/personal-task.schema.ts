// schemas/personal-task.schema.ts
import { ObjectId } from 'mongodb';
import { Descendant } from 'slate';

export interface PersonalTaskDoc {
  _id?: ObjectId;
  taskId: string;
  content: Descendant[] |[]; // Slate 内容
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
