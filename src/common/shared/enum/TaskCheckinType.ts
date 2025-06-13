// enum('daily','weekly','monthly','interval_days')

/**
 * @description 任务的打卡类型
 * 0：DAYIL每日
 * 1：WEEKLY每周
 * 3：MONTHLY每月
 * INTERVAL自定义
 */

export enum TaskCheckinType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  INTERVAL = 'INTERVAL',
  ONEDAY = 'ONEDAY',
}
