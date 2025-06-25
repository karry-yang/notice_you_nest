import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreatePersonalTaskDto } from './create-personal-task.dto';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCheckInRuleDto } from '../checkinRule/create-checkin-rule.dto';
import { Descendant } from 'slate';

/**
 * @description  修改personalTask的数据  personalTask外键属性包含tagid  非外键属性listicleId
 */
export class UpdatePersonalTaskDto extends PartialType(CreatePersonalTaskDto) {
  @ApiProperty({ description: '修改的任务id' })
  @IsString()
  taskId!: string;

  //这应该是创建之后添加主要内容之后创建的  且id应该是
  @ApiPropertyOptional({ description: '任务内容保存地址' })
  @IsOptional()
  @IsString()
  taskObjectId?: string | null = null;

  //内容
  @ApiPropertyOptional({ description: '新的内容', type: 'array' }) 
  @IsOptional()
  content?: Descendant[]; // or any[]

  //删除标签ids
  deletedTags?: string[];
  //删除清单id

  //层级数  只有层级数
  level?: number;
}
