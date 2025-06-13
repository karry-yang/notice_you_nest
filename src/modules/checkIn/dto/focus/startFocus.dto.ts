import { Type } from 'class-transformer';
import { IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class StartFocusDto {
  @IsString()
  @IsNotEmpty()
  habitTaskId!: string;
  //开始时间

  @Type(() => Date)
  @IsISO8601()
  habitTaskStartTime!: Date;


}
