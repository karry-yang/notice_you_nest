import { NoticeStatusEnum } from "src/common/shared/enum/NoticeStatusEnum";
import { ThemeEnum } from "src/common/shared/enum/ThemeEnum";
import { IManualAuditableBase } from 'src/common/shared/baseInterface/manualAuditableBase.interface';
export interface IUserSetting extends IManualAuditableBase {
  userSettingId: string;
  theme: ThemeEnum; // 主题
  noticeStatus: NoticeStatusEnum; // 通知类型
}
