import { TaskCheckinStatusEnum } from 'src/common/shared/enum/TaskCheckinStatusEnum';
import { Type } from 'class-transformer';
import { IsEnum, IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePersonalCheckinDto {
  @Type(() => Date)
  @IsISO8601()
  checkinTime!: Date;
  @IsOptional()
  @IsString()
  checkinLog?: string;
  @IsString()
  @IsNotEmpty()
  checkinTaskId!: string;
  @IsEnum(TaskCheckinStatusEnum)
  checkinStatus!: TaskCheckinStatusEnum;
}
