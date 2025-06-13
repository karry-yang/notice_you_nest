import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHabitGroupDto {
  @IsString()
  @IsNotEmpty()
  habitGroupTitle!: string;



}
