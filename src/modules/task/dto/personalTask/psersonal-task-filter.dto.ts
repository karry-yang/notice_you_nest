import { ApiProperty } from '@nestjs/swagger';
import { TaskCheckinStatusEnum } from '@shared/enum/TaskCheckinStatusEnum';
import { TaskOrderBy } from '@shared/enum/taskOrderByEnum';
import { Transform } from 'class-transformer';
import {  IsEnum, IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';
import { decodeCursor, TaskCursor } from 'src/common/types/paginatedResult.interface';

/**
 * @description  前端传递的过滤条件和分页浮标
*/
export class PersonalTaskFilterDto {
  @ApiProperty({ description: '起始时间' })
  @IsString()
  @IsOptional()
  startTime?: string;

  @ApiProperty({ description: '结束时间' })
  @IsOptional()
  @IsString()
  endTime?: string;


  @ApiProperty({ description: '任务等级' })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  taskPriority?: number[];

  @ApiProperty({ description: '清单id' })
  @IsOptional()
  @IsString()
  listiceId?: string[];

  @ApiProperty({ description: '标签id' })
  @IsOptional()
  @IsString()
  tagId?: string[];

  @ApiProperty({ description: '任务状态  完成true --未完成false' })
  @IsOptional()
  lastCheckinStatus?: boolean;

  @ApiProperty({ description: '排序规则' })
  @IsOptional()
  @IsEnum(TaskOrderBy)
  orderBy?: TaskOrderBy;

 @ApiProperty({
    description: '修改的起始时间（新创建的项目修改时间等于创建时间）',
    required: false,
    example: '2024-06-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsISO8601()
  @Transform(({ value }) => new Date(value).toISOString())
  updateStartTime?: string;

  @ApiProperty({
    description: '修改的结束时间',
    required: false,
    example: '2024-06-30T23:59:59.000Z',
  })
  @IsOptional()
  @IsISO8601()
  @Transform(({ value }) => new Date(value).toISOString())
  updateEndTime?: string;

  @ApiProperty({ description: '分页浮标' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    try {
      const decoded = decodeCursor(value);
      return decoded.payload; // 只保留 payload
    } catch {
      return undefined;
    }
  })
  nextCursor?: TaskCursor;
}
