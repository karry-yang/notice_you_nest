import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  tagTitle!: string;

  @IsString()
  @IsString()
  tagColor!: string;

  @IsString()
  @IsOptional()
  tagDescription: string = '';

  @IsString()
  @IsNotEmpty()
  userId!: string;
}
