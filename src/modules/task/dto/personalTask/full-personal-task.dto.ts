import { ApiProperty } from '@nestjs/swagger';
import { PriorityEnum } from '@shared/enum/PriorityEnum';
import { Listicle } from '@task/entities/listicle.entity';
import { PersonalTask } from '@task/entities/personal-task.entity';
import { Tag } from '@task/entities/tag.entity';
import { CheckinRule } from '@task/entities/task-checkin-rule.entity';
import { BasePersonalTaskDto } from './base-personal-task.dto';
import { BaseTagDto } from '../tag/base-tag.dto';
import { Transform } from 'class-transformer';

/**
 * @description  拥有全部关联属性的personalTask  包含标签数组  清单对象  打卡规则
*/
export class FullPersonalTaskDto {
  @ApiProperty( { type:BasePersonalTaskDto,description:'任务主体'})
  @Transform()
  personalTask!:BasePersonalTaskDto

  @ApiProperty({type:BaseTagDto,description:'拥有的标签数组'})
  @Transform()
  tags!:Tag[]

  @ApiProperty()
  listicle!:Listicle
  cheinckInRule!:CheckinRule

  

}
