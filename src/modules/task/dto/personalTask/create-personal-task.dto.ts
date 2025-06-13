import { ListicleTypeEnum } from 'src/common/shared/enum/ListicleTypeEnum';
import { PriorityEnum } from 'src/common/shared/enum/PriorityEnum';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDate, IsNumber, IsISO8601, IsArray, ValidateNested } from 'class-validator';
import { CreateCheckInRuleDto } from '../checkinRule/create-checkin-rule.dto';
import { CreateListicleDto } from '../listicle/createListicle.dto';
import { CreateTagDto } from '../tag/createTag.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class CreatePersonalTaskDto {
  @ApiProperty({ description: '任务标题' })
  @IsNotEmpty()
  @IsString()
  taskTitle!: string;

  @ApiPropertyOptional({ description: '任务优先级1-4', enum: PriorityEnum, enumName: 'PriorityEnum' })
  @IsEnum(PriorityEnum)
  @IsOptional()
  @Transform(({ value }) => value ?? PriorityEnum.ONE)
  taskPriority?: PriorityEnum;

  @ApiPropertyOptional({ description: '任务父级id--默认是null' })
  @IsOptional()
  @IsString()
  taskParentId?: string | null = null;

  @ApiPropertyOptional({ description: '任务描述' })
  @IsOptional()
  @IsString()
  taskDescription?: string | null = null;

  @ApiPropertyOptional({ description: '任务开始时间，不传为当前时间' })
  @IsOptional()
  @IsISO8601({ strict: true })
  @Transform(({ value }) => value ?? new Date().toISOString())
  taskStartTime?: string;

  @ApiPropertyOptional({ description: '任务结束时间，默认一年后' })
  @IsOptional()
  @IsISO8601({ strict: true })
  @Transform(({ value }) => {
    if (value) return value;
    const oneYearLater = new Date();
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    return oneYearLater.toISOString();
  })
  taskEndTime?: string;

  // @ApiProperty({description:'创建人id'})
  //   @IsNotEmpty()
  //   @IsString()
  //   createdBy!: string;
  //标签ids
  @ApiPropertyOptional({ description: '标签ids' })
  @IsArray()
  @IsOptional()
  addTagIds?: string[] | null = [];

  @ApiPropertyOptional({ description: '打卡规则对象', type: CreateCheckInRuleDto })
  @IsOptional()
  @Type(() => CreateCheckInRuleDto)
  @ValidateNested()
  addCheckInRule?: CreateCheckInRuleDto;

  //添加已有清单id
  @ApiPropertyOptional({ description: '关联的已有清单id' })
  @IsOptional()
  @IsString()
  listicleId?: string;

  //拥有的文件路径
  hasFiles?: string[];
  // @IsNotEmpty()
  // @IsNumber()
  // taskCheckinRuleId?: string;

  //新增的标签
  @ApiPropertyOptional({ description: '新增的标签对象', type: CreateTagDto })
  @IsOptional()
  @Type(() => CreateTagDto)
  @ValidateNested()
  addNewTag?: CreateTagDto;

  //新增清单
  @ApiPropertyOptional({ description: '新增的清单对象', type: CreateListicleDto })
  @IsOptional()
  @Type(() => CreateListicleDto)
  @ValidateNested()
  addNewListicle?: CreateListicleDto;

  
}
