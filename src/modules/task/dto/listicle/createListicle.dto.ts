import { ListicleTypeEnum } from "src/common/shared/enum/ListicleTypeEnum";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateListicleDto {
  @IsString()
  @IsNotEmpty()
  listicleTitle!: string; // 清单标题

  @IsString()
  @IsOptional()
  listicleIcon?: string; // 清单图标

  @IsEnum(ListicleTypeEnum)
  @IsNotEmpty()
  listicleType!: ListicleTypeEnum// 清单类型
  
  @IsOptional()
  @IsNumber()
  organizationId?: string; // 组织ID

  @IsOptional()
  @IsNumber()
  departmentId?: string; // 部门ID

  @IsOptional()
  @IsNumber()
  userId?: string; // 用户ID
}