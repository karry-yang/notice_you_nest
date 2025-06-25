import { PersonalTask } from '@task/entities/personal-task.entity';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { TaskCursor } from 'src/common/types/paginatedResult.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { TaskCursorDto } from 'src/common/dto/paginatedResult.dto';
import { DetailPersonalTaskDto } from './detail-personal-task.dto';

/**
 * @description 携带分页浮标的返回数据     FullPersonalTaskDto[];
 */
export class DetailPersonalTasksWithPaginationDto {
  @ApiProperty({ type: [DetailPersonalTaskDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailPersonalTaskDto)
  tasks!: DetailPersonalTaskDto[];

  @ApiProperty({ required: false, type: TaskCursorDto })
  nextCursor!: TaskCursor;
  @ApiProperty({description:'是否有下一页的标志'})
  hasNext!:boolean
}
