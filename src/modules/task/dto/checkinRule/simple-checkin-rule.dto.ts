import { ApiProperty } from '@nestjs/swagger';
import { TaskCheckinType } from '@shared/enum/TaskCheckinType';
import { TaskTypeEnum } from '@shared/enum/TaskTypeEnum';
import { Expose } from 'class-transformer';
import { IsEnum, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SimpleCheckinRuleDto {
  @ApiProperty({ description: '规则id' })
  @Expose({ name: 'rule_id' })
  ruleId!: string;

  @ApiProperty({ description: '关联的任务id' })
  @Expose({ name: 'task_id' })
  @IsString()
  @IsNotEmpty()
  taskId!: string;

  @ApiProperty({ description: '关联的任务类型' })
  @Expose({ name: 'task_type' })
  @IsEnum(TaskTypeEnum)
  @IsNotEmpty()
  taskType!: TaskTypeEnum;
  
  @ApiProperty({ enum: TaskCheckinType, enumName: 'TaskCheckinType', description: '打卡类型' })
  @IsEnum(TaskCheckinType)
  ruleType!: TaskCheckinType;

  @ApiProperty({ description: '打卡的天数序列' })
  @IsJSON()
  @IsOptional()
  @Expose({ name: 'days' })
  days?: string;

  @ApiProperty({ description: '打卡的时间' })
  @IsJSON()
  @IsOptional()
  @Expose({ name: 'times' })
  times?: string;

  @ApiProperty({ description: '间隔天数' })
  @IsNumber()
  @IsOptional()
  @Expose({ name: 'interval_days' })
  intervalDays?: number;
}
