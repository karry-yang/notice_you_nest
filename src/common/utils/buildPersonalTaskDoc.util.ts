import { PersonalTaskDoc } from "@database/mongodb/schemas/personal-task.schema";
import { UpdatePersonalTaskDto } from "@task/dto/personalTask/update-personal-task.dto";
import { time } from "console";
import { ObjectId } from "typeorm";

export function buildPersonTaskDoc(dto: UpdatePersonalTaskDto, userId: string,time:Date): PersonalTaskDoc {

  return {
    taskId: dto.taskId,
    content: dto.content ?? [],
    createdAt: time,
    updatedAt: time,
    userId,
  };
}
