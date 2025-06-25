import { ApiPro, ApiProperty, ApiPropertyOptional, ApiPropertyOptionalpertyOptional } from '@nestjs/swagger';
import { TaskCheckinType } from '@shared/enum/TaskCheckinType';
import { TaskTypeEnum } from '@shared/enum/TaskTypeEnum';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsEnum, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SimpleCheckinRuleDto {
  @ApiPropertyOptional({ description: '规则id' })
  @Expose()
  ruleId?: string;

  @ApiPropertyOptional({ description: '关联的任务id' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  taskId?: string;

  @ApiProperty({ description: '关联的任务类型' })
  @Expose()
  @IsEnum(TaskTypeEnum)
  @IsNotEmpty()
  taskType!: TaskTypeEnum;

  @ApiProperty({ enum: TaskCheckinType, enumName: 'TaskCheckinType', description: '打卡类型' })
  @IsEnum(TaskCheckinType)
  ruleType!: TaskCheckinType;
  
  @ApiPropertyOptional({ description: '打卡的天数序列', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Expose()
  @Type(() => String)
  days?: string[];

  @ApiPropertyOptional({ description: '打卡的时间', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Expose()
  @Type(() => String)
  times?: string[];

  @ApiPropertyOptional({ description: '间隔天数' })
  @IsNumber()
  @IsOptional()
  @Expose()
  intervalDays?: number;
}
