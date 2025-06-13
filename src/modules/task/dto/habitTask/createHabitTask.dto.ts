import { IsString, IsNotEmpty, IsOptional, IsEnum, IsISO8601 } from 'class-validator';
import { Type } from 'class-transformer';
import { SettingSwitchEnum } from 'src/common/shared/enum/SettingSwitchEnum';

export class CreateHabitTaskDto {
  @IsString()
  @IsNotEmpty()
  habitTaskTitle!: string;

  @Type(() => Date)
  @IsISO8601()
  habitTaskStartTime!: Date;

  @Type(() => Date)
  @IsISO8601()
  habitTaskEndTime!: Date;

  @IsOptional()
  @IsString()
  habitTaskDescription?: string;

  @IsString()
  habitTaskNoticeTime!: string; // 可以考虑用正则校验格式，比如 HH:mm

  @IsEnum(SettingSwitchEnum)
  habitTaskOpenLog!: SettingSwitchEnum;

 
  @IsOptional()
  @IsString()
  habitTaskGroupId?: string; // 选择已有分组

  @IsOptional()
  @IsString()
  habitTaskGroupName?: string; // 自定义分组名称
}
