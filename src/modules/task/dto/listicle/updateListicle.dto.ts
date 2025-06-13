import { PartialType } from '@nestjs/swagger';
import { CreateListicleDto } from './createListicle.dto';


export class UpdateListicleDto extends PartialType(CreateListicleDto)  {
habitTaskId!:string
}
