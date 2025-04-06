import { AutoAuditableBase } from '@shared/baseEntity/autoAuditableBase.entity';
import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ThemeEnum } from '@shared/enum/ThemeEnum';
import { NoticeStatusEnum } from '@shared/enum/NoticeStatusEnum';
import { IUserSetting } from '../interfaces/setting.interface';
/**
 * @description 用户设置类  常用的设置保存在mysql中，不怎么用的属性使用redis保存
 * @param userSettingId 用户设置id 主键
 * @param theme  主题:ThemeEnum
 * @param noticeStatus 通知类型
 */
@Entity()
export class UserSettings extends AutoAuditableBase implements IUserSetting {
  @PrimaryColumn({ name: 'user_setting_id', type: 'bigint' })
  userSettingId!: bigint; // 与用户一对一绑定

  @Column({ type: 'enum', enum: ThemeEnum, default: ThemeEnum.LIGHT })
  theme: ThemeEnum = ThemeEnum.LIGHT; // 主题

  @Column({
    type: 'enum',
    enum: NoticeStatusEnum,
    default: NoticeStatusEnum.UNNOTICE,
  })
  noticeStatus: NoticeStatusEnum = NoticeStatusEnum.UNNOTICE; // 通知类型
}

// Redis存储结构（高频访问的临时配置）
// const redisSettings = {
//   `user:${userId}:settings`: {
//     lastActiveTab: 'dashboard',
//     uiZoomLevel: 1.2,
//     temporaryFlags: {...}
//   }
// }
