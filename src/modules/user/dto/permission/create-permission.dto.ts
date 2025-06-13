import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PermissionTypeEnum } from 'src/common/shared/enum/PermissionTypeEnum';
import { 
  IsString, 
  IsNotEmpty, 
  IsEnum, 
  IsOptional, 
  IsNumberString,
  Length, 
  Matches
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePermissionDto {
  // ========== 基础信息 ==========
  @ApiProperty({
    description: '权限名称',
    example: '用户管理',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  permissionName!: string;

  @ApiPropertyOptional({
    description: '权限描述',
    example: '允许创建和删除用户',
    maxLength: 200,
    nullable: true
  })
  @IsOptional()
  @IsString()
  @Length(0, 200)
  permissionDescription?: string | null;

  // ========== 权限编码 ==========
  @ApiProperty({
    description: '唯一权限编码（格式: 资源:操作）',
    example: 'user:manage',
    maxLength: 50
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  @Matches(/^[a-z]+:[a-z]+$/, {
    message: '权限编码格式应为 resource:action'
  })
  permissionCode!: string;

  // ========== 权限类型 ==========
  @ApiProperty({ 
    enum: PermissionTypeEnum,
    example: PermissionTypeEnum.READ
  })
  @IsEnum(PermissionTypeEnum)
  permissionType!: PermissionTypeEnum;

  // ========== 管辖范围 ==========
  @ApiPropertyOptional({
    type: String,
    description: '所属组织ID（仅当permissionType为ORG/DEPT时需传）',
    example: '1234567890',
    nullable: true
  })
  @IsOptional()
  @IsNumberString()
  // @Transform(({ value, obj }) => 
  //   [PermissionTypeEnum., PermissionTypeEnum.ADMIN_ORG].includes(obj.permissionType) && value 
  //     ? BigInt(value) 
  //     : null
  // )
  organizationId?: bigint | null;

  @ApiPropertyOptional({
    type: String,
    description: '所属部门ID（仅当permissionType为DEPT时需传）',
    example: '9876543210',
    nullable: true
  })
  @IsOptional()
  @IsNumberString()
  // @Transform(({ value, obj }) => 
  //   obj.permissionType === PermissionTypeEnum.ADMIN_DEP && value 
  //     ? BigInt(value) 
  //     : null
  // )
  departmentId?: bigint | null;
}