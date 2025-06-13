import { Type } from 'class-transformer';
import { IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EndFocusDto {
  @IsString()
  @IsNotEmpty()
  habitTaskId!: string;



  //结束时间
  @Type(() => Date)
  @IsISO8601()
  habitTaskEndTime!: Date;

  //日志
  @IsOptional()
  @IsString()
  habitTaskFocusLog?: string;
}
