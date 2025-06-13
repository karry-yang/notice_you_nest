import { ApiProperty } from '@nestjs/swagger';
import { TaskCheckinType } from '@shared/enum/TaskCheckinType';
import { TaskTypeEnum } from '@shared/enum/TaskTypeEnum';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCheckInRuleDto {
  // @ApiProperty({ description: '关联的任务id' })
  // @IsString()
  // @IsNotEmpty()
  // taskId!: string;

  @ApiProperty({ description: '关联的任务类型' })
  @IsEnum(TaskTypeEnum)
  @IsNotEmpty()
  taskType!: TaskTypeEnum;

  @IsEnum(TaskCheckinType)
  @IsNotEmpty()
  ruleType: TaskCheckinType = TaskCheckinType.DAILY;

  @IsOptional()
  @IsArray()
  days?: string[];

  @IsOptional()
  @IsArray()
  times?: string[];

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  intervalDays?: number;
}
