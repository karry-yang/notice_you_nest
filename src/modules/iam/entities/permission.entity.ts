import { ManualAuditableBase } from '@shared/baseEntity/manualAuditable.entity';
import { IPermission } from './interfaces/permission.interface';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { PermissionTypeEnum } from '@shared/enum/PermissionTypeEnum';

@Entity('permission', { schema: 'iam' }) // 指定实体对应的数据库表名和模式
export class Permission extends ManualAuditableBase implements IPermission {
  @PrimaryColumn({ type: 'bigint', name: 'permission_id' })
  permissionId!: bigint; // 主键ID

  @Column({ type: 'varchar', name: 'permission_type', length: 10, nullable: false })
  permissionName: string = ''; // 权限名称

  @Column({ type: 'enum', enum: ['menu', 'action'], name: 'permission_type', default: 'action' })
  permissionDescription: string = ''; // 权限描述

  @Column({ type: 'bigint', name: 'parent_id', nullable: true })
  permissionCode: string = ''; // 权限编码

  @Column({ type: 'enum', enum: ['menu', 'action'], name: 'permission_type', default: 'action' })
  permissionType!: PermissionTypeEnum; // 权限类型，菜单或操作

  @Column({ type: 'bigint', name: 'parent_id', nullable: true })
  parentId?: bigint;
}
