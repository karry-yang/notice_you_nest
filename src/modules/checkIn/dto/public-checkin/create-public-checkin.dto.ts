import { TaskCheckinStatusEnum } from 'src/common/shared/enum/TaskCheckinStatusEnum';
import { Type } from 'class-transformer';
import { IsEnum, IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreatePublicCheckinDto {
  @Type(() => Date)
  @IsISO8601()
  checkinTime!: Date;
  checkinLog?: string;

  @IsString()
  @IsNotEmpty()
  taskId!: string;

  @IsString()
  @IsNotEmpty()
  checkinUserId!: string;


  @IsEnum(TaskCheckinStatusEnum)
  checkinStatus!: TaskCheckinStatusEnum;


  @IsOptional()
  @IsString()
  organizationId?: string;

  
  @IsOptional()
  @IsString()
  departmentId?: string;
}
