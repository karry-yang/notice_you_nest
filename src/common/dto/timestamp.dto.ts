import { Transform } from 'class-transformer';
import { IsISO8601, IsOptional } from 'class-validator';

export class TimestampDto {
  @IsOptional()
  @IsISO8601({}, { message: 'timestamp 必须是 ISO8601 格式的时间字符串' })
  @Transform(({ value }) => {
    // 如果前端没传、或传了空字符串/null/undefined，默认返回当前时间
    if (!value || value === 'null' || value === 'undefined' || value.trim() === '') {
      return new Date();
    }
    return new Date(value);
  })
  timestamp!: Date;
}
