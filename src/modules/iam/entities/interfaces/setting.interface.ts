import { NoticeStatusEnum } from "@shared/enum/NoticeStatusEnum";
import { ThemeEnum } from "@shared/enum/ThemeEnum";

export interface IUserSetting {
  userSettingId: bigint;
  theme: ThemeEnum; // 主题
  noticeStatus: NoticeStatusEnum; // 通知类型
}
