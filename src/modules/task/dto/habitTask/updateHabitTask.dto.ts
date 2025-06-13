import { PartialType } from '@nestjs/swagger';
import { CreateHabitTaskDto } from './createHabitTask.dto';

export class UpdateHabitTaskDto extends PartialType(CreateHabitTaskDto)  {
habitTaskId!:string
}
