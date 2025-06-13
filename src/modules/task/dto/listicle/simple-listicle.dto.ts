import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SimpleListicleDto {
  @ApiProperty({ description: '清单id' })
  @Expose()
  listicleId!: string;

  @ApiProperty({ description: '清单标题' })
  @Expose()
  listicleTitle!: string;

  @ApiProperty({ description: '父级标签', nullable: true })
  @Expose()
  parentId!: string | null;
}
