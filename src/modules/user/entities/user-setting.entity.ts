import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ThemeEnum } from 'src/common/shared/enum/ThemeEnum';
import { NoticeStatusEnum } from 'src/common/shared/enum/NoticeStatusEnum';
import { IUserSetting } from '@user/entities/interfaces/setting.interface';
import { ManualAuditableBase } from 'src/common/shared/baseEntity/manualAuditable.entity';
/**
 * @description 用户设置类  常用的设置保存在mysql中，不怎么用的属性使用redis保存
 * @param userSettingId 用户设置id 主键
 * @param theme  主题:ThemeEnum
 * @param noticeStatus 通知类型
 */
@Entity()
export class UserSetting extends ManualAuditableBase implements IUserSetting {
  @PrimaryColumn({ name: 'user_setting_id', type: 'bigint' })
  userSettingId!: string; // 与用户一对一绑定

  @Column({ name:"theme", type: 'enum', enum: ThemeEnum, default: ThemeEnum.LIGHT })
  theme: ThemeEnum = ThemeEnum.LIGHT; // 主题

  @Column({
    name:"notice_status",
    type: 'enum',
    enum: NoticeStatusEnum,
    default: NoticeStatusEnum.UNNOTICE,
  })
  noticeStatus: NoticeStatusEnum = NoticeStatusEnum.UNNOTICE; // 通知类型
}
