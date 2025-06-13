
import { PersonalTask } from "@task/entities/personal-task.entity";
import { IsArray, IsOptional, ValidateNested } from "class-validator";
import { TaskCursor } from "src/common/types/paginatedResult.interface";
import { ApiProperty } from '@nestjs/swagger';
import { Type } from "class-transformer";
import { TaskCursorDto } from "src/common/dto/paginatedResult.dto";
import { FullPersonalTaskDto } from "./full-personal-task.dto";


/**
 * @description 携带分页浮标的返回数据     FullPersonalTaskDto[];
*/
export class PersonalTaskWithPaginationDto {
  @ApiProperty({ type: [FullPersonalTaskDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FullPersonalTaskDto)
  tasks!:  FullPersonalTaskDto[];

  @ApiProperty({ required: false, type: TaskCursorDto })
  @IsOptional()
  nextCursor?: TaskCursor;
}
