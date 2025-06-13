import { Type } from 'class-transformer';
import { IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { StartFocusDto } from './startFocus.dto';
import { EndFocusDto } from './endFocus.dto';

type CreateFocusDtoBase = Pick<StartFocusDto, 'habitTaskStartTime'> & Pick<EndFocusDto, 'habitTaskEndTime' | 'habitTaskFocusLog'>;

export class CreateFocusDto implements CreateFocusDtoBase {
  @IsString()
  @IsNotEmpty()
  habitTaskId!: string;

  @Type(() => Date)
  @IsISO8601()
  habitTaskStartTime!: Date;

  @Type(() => Date)
  @IsISO8601()
  habitTaskEndTime!: Date;

  @IsOptional()
  @IsString()
  habitTaskFocusLog?: string;
}
