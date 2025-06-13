import { PartialType } from '@nestjs/swagger';
import { CreatePublicTaskDto } from './createPublicTask.dto';

export class UpdatePublicTaskDto extends PartialType(CreatePublicTaskDto) {
  taskId!: string;
}
