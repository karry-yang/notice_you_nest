import { UpdatePersonalTaskDto } from "@task/dto/personalTask/update-personal-task.dto";

function buildMongoDoc(dto: UpdatePersonalTaskDto, userId: string): PersonalTaskDoc {

  return {
    taskId: dto.taskId,
    content: dto.content ?? [],
    createdAt: now,
    updatedAt: now,
    userId,
  };
}
