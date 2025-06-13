import { IsNotEmpty, IsString } from 'class-validator';
import { CreateTagDto } from './createTag.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  @IsString()
  @IsNotEmpty()
  tagId!: string;
}
