import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateHabitGroupDto {
  @IsString()
  @IsNotEmpty()
  habitGroupTitle!: string;

  // @IsString()
  // @IsNotEmpty()
  // updateBy!: string;
}
