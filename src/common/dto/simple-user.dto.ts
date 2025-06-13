import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class SimpleUser {
  @Expose()
  @IsString()
  userId!: string;

  @Expose()
  @IsString()
  userName!: string;

  @Expose()
  @IsString()
  userEmail!: string;

  @Expose()
  @IsString()
  @IsOptional()
  oraganizationId?: string;

  @Expose()
  @IsString()
  @IsOptional()
  oraganizationName?: string;

  @Expose()
  @IsString()
  @IsOptional()
  departmentId?: string;

  @Expose()
  @IsString()
  @IsOptional()
  departmentName?: string;
}
