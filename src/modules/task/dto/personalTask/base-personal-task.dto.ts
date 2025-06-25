import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PriorityEnum } from '@shared/enum/PriorityEnum';
import { RowStatusEnum } from '@shared/enum/RowStatusEnum';
import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { SimpleListicleDto } from '../listicle/simple-listicle.dto';
import { SimpleTagDto } from '../tag/simple-tag.dto';
import { SimpleCheckinRuleDto } from '../checkinRule/simple-checkin-rule.dto';
export class BasePersonalTaskDto {
  @ApiProperty({ description: '任务id' })
  @IsString()
  @Expose() //plainToInstance返回给前端
  taskId!: string;

  @ApiProperty({ description: '任务标题' })
  @IsString()
  @Expose()
  taskTitle!: string;

  @ApiProperty({ description: '任务优先级' })
  @IsEnum(PriorityEnum)
  @Expose()
  taskPriority!: PriorityEnum;

  @ApiProperty({ description: '父级任务id' })
  @Expose()
  taskParentId!: string;

  @ApiProperty({ description: '任务文档id' })
  @Expose()
  taskObjectId!: string;

  @ApiProperty({ description: '任务描述' })
  @Expose()
  taskDescription!: string;

  @ApiProperty({ description: '任务开始时间' })
  @Expose()
  taskStartTime!: Date;

  @ApiProperty({ description: '任务结束时间' })
  @Expose()
  taskEndTime!: Date;

  @ApiProperty({ description: '是否有文件' })
  @Expose()
  hasFiles!: boolean;

  @ApiProperty({ description: '创建时间' })
  createdAt!: Date;

  @ApiProperty({ enum: RowStatusEnum, enumName: 'RowStatusEnum', description: '状态' })
  @Expose()
  status!: RowStatusEnum;

  @ApiProperty({ description: '创建人' })
  @Expose()
  createdBy!: string;

  @ApiProperty({ type: () => SimpleCheckinRuleDto, description: '任务打卡规则' })
  @Expose()
  checkinRule!: SimpleCheckinRuleDto;

  @ApiPropertyOptional({ description: '任务的清单id' })
  @IsOptional()
  @Expose()
  listicleId?: string;
  //计算属性
  @ApiProperty({ description: '所在层数' })
  @IsOptional()
  @IsNumber()
  @Expose()
  leavel?: number;
}
