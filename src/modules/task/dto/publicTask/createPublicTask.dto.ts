import { ListicleTypeEnum } from 'src/common/shared/enum/ListicleTypeEnum';
import { PriorityEnum } from 'src/common/shared/enum/PriorityEnum';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDate, IsNumber } from 'class-validator';

export class CreatePublicTaskDto {
  @IsNotEmpty()
  @IsString()
  taskTitle!: string;

  @IsEnum(PriorityEnum)
  taskPriority: PriorityEnum = PriorityEnum.ONE;

  @IsNotEmpty()
  @IsNumber()
  taskCheckinRuleId!: string; 

  @IsOptional()
  @IsNumber()
  taskParentId: string | null = null;

  @IsOptional()
  @IsNumber()
  taskObjectId: string | null = null;

  @IsOptional()
  @IsNumber()
  departmentId: string | null = null;

  @IsNotEmpty()
  @IsNumber()
  organizationId!: string;

  @IsOptional()
  @IsString()
  taskDescription: string | null = null;

  @IsNotEmpty()
  @IsDate()
  taskStartTime!: Date;

  @IsOptional() // 允许null，表示永不过期
  @IsDate()
  taskEndTime: Date | null = null;

  @IsNotEmpty()
  @IsEnum(ListicleTypeEnum)
  taskListicleType!: ListicleTypeEnum;

  @IsNotEmpty()
  @IsNumber()
  taskCretorId!: string;
}
