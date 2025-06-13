import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConnectUserDto } from '@user/dto/user/connect-user.dto'; // 确保路径正确
import { Expose, plainToClass, Transform, Type } from 'class-transformer';
import { IsString, IsOptional, IsNumberString, Matches, Length } from 'class-validator';
import { ResponseDepartmentDto } from '../department/response-department.dto';

export class ResponseOrganizationDto {
  // ========== 基础信息 ==========
  @ApiProperty({
    type: String,
    description: '组织ID',
    example: '1234567890',
  })
  @IsNumberString({}, { message: '组织ID必须是数字字符串' })
  @Expose()
  @Transform(({ value }) => value?.toString()) // BigInt转字符串
  organizationId!: bigint;

  @ApiProperty({
    description: '组织名称',
    example: '阿里巴巴集团',
  })
  @Expose()
  @IsString()
  organizationName!: string;

  // ========== 可选字段 ==========
  @ApiPropertyOptional({
    description: '组织代码',
    example: 'ORG_ALIBABA',
    maxLength: 50,
  })
  @Expose()
  @IsOptional()
  @IsString()
  @Matches(/^[A-Z0-9_]+$/) // 限制大写字母、数字、下划线
  organizationCode?: string;

  @ApiPropertyOptional({
    description: '组织描述',
    example: '全球领先的电子商务公司',
    nullable: true,
  })
  @Expose()
  @IsOptional()
  @IsString()
  organizationDescription?: string | null;

  @ApiPropertyOptional({
    description: 'OSS对象键(如 images/org-logos/abc123.jpg)',
    example: 'org-logos/2023/alibaba.png',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9/\-_.]+$/i, {
    message: 'Logo路径只能包含字母、数字、斜杠、中划线和下划线',
  })
  @Length(1, 255)
  organizationLogo?: string;

  // ========== 负责人信息 ==========
  @ApiPropertyOptional({
    type: String,
    description: '负责人ID',
    example: '9876543210',
    nullable: true,
  })
  @Expose()
  @IsOptional()
  @Transform(({ value }) => value?.toString())
  organizationLeaderId?: bigint | null;

  @ApiPropertyOptional({
    type: ConnectUserDto,
    description: '负责人详细信息',
  })
  @Expose()
  @IsOptional()
  @Type(() => ConnectUserDto) // 嵌套DTO转换
  organizationLeader?: ConnectUserDto | null;

  @ApiPropertyOptional({
    type: () => ResponseDepartmentDto, // 前端可见的DTO类型
    description: '部门列表（由InternalDepartmentDto转换而来）',
    isArray: true,
    nullable: true,
    example: [
      {
        departmentId: '1001',
        departmentName: '技术研发部',
        departmentCode: 'DEPT_DEV',
      },
    ],
  })
  @Expose()
  @IsOptional()
  @Type(() => ResponseDepartmentDto) // 指定转换目标类型
  @Transform(
    ({ value }) => {
      if (!value) return null;
      // 实际转换逻辑应在拦截器/服务层完成
      return value.map((dept) =>
        plainToClass(ResponseDepartmentDto, dept, {
          excludeExtraneousValues: true,
        })
      );
    },
    { toClassOnly: true }
  )
  departments?: ResponseDepartmentDto[] | null;
}
