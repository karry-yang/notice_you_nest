import { StatusEnum } from '@shared/enum/RowStatusEnum';
import { Ilisticle } from './interfaces/listicle.interface';
import { ManualAuditableBase } from 'src/common/shared/baseEntity/manualAuditable.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ListicleTypeEnum } from 'src/common/shared/enum/ListicleTypeEnum';

/**
 * 除了创建人
 * userId用于区分个人清单和其他清单
 * @description 清单实体类 清单表通过 listicleType+ organizationId、+departmentId?查询公开任务  或者listicleType+userId查询个人任务
 *  @implements {Ilisticle}
  
 */
@Entity(`listicle`)
export class Listicle extends ManualAuditableBase implements Ilisticle {
  @PrimaryColumn({ name: 'listicle_id', type: 'bigint', comment: '清单id' })
  listicleId!: string;

  @Column({ name: 'listicle_title', type: 'varchar', length: 255, comment: '清单标题' })
  listicleTitle!: string;

  @Column({ name: 'listile_icon', type: 'varchar', length: 255, nullable: true, comment: '清单icon' })
  listicleIcon!: string;

  @Column({ name: 'listicle_type', type: 'enum', enum: ListicleTypeEnum, comment: '清单类型' })
  listicleType!: ListicleTypeEnum;

  @Column({ name: 'organization_id', type: 'bigint', nullable: true, comment: '清单归属的组织' })
  organizationId?: string;

  @Column({ name: 'department_id', type: 'bigint', nullable: true, comment: '清单归属的部门' })
  departmentId?: string;

  @Column({ name: 'user_id', type: 'bigint', nullable: true, comment: '清单归属的用户' })
  userId?: string;
}
