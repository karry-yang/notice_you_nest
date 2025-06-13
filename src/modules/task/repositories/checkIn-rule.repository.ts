import { CreateCheckInRuleDto } from '@task/dto/checkinRule/create-checkin-rule.dto';
import { ICheckinRuleRepository } from './interfaces/checkin-rule.repository.interface';
import { DataSource } from 'typeorm';
import { TaskCheckinStatusEnum } from '@shared/enum/TaskCheckinStatusEnum';
import { TaskCheckinType } from '@shared/enum/TaskCheckinType';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckinRuleRepository implements ICheckinRuleRepository {
  constructor(private readonly dataSource: DataSource) {}
  async findCheckinRule(userId: string, ruleId: string): Promise<any> {
    const result = await this.dataSource.query(
      `SELECT cr.rule_id AS ruleId,cr.rule_type AS ruleType,cr.days AS days,cr.times AS  times, cr.interval_days  AS intervalDays FROM checkin_rule cr WHERE cr.rule_id=? AND cr.created_by=? `,
      [ruleId, userId]
    );
    return result;
  }
  async createCheckinRule(userId: string, ruleId: string, dto: CreateCheckInRuleDto): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    let sql = '';
    let params: any[] = [];

    if (dto?.ruleType === TaskCheckinType.DAILY) {
      sql = `
    INSERT INTO checkin_rule (rule_id,task_type, rule_type,times, create_by, created_at, status)
    VALUES (?, ?,?, ?, ?, ?,?)
  `;
      params = [ruleId, dto.taskType, dto.ruleType, dto.times, userId, new Date(), 2];
    }
    if (dto?.ruleType === TaskCheckinType.INTERVAL) {
      sql = `
    INSERT INTO checkin_rule (rule_id,task_type, rule_type, interval_days,times,create_by, created_at, status)
    VALUES (?, ?, ?, ?, ?,?,?,?)
  `;
      params = [ruleId, dto.taskType, dto.ruleType, dto.intervalDays, dto.times, userId, new Date(), 2];
    }
    if (dto?.ruleType === TaskCheckinType.MONTHLY) {
      sql = `
    INSERT INTO checkin_rule (rule_id,task_type, rule_type, days,times,create_by, created_at, status)
    VALUES (?, ?, ?, ?, ?,?,?)
  `;
      params = [ruleId, dto.taskType, dto.ruleType, dto.days, dto.times, userId, new Date(), 2];
    }
    if (dto?.ruleType === TaskCheckinType.WEEKLY) {
      sql = `
    INSERT INTO checkin_rule (rule_id,task_type, rule_type, days,times,create_by, created_at, status)
    VALUES (?, ?, ?, ?, ?,?,?)
  `;
      params = [ruleId, dto.taskType, dto.ruleType, dto.days, dto.times, userId, new Date(), 2];
    }
    if (dto?.ruleType === TaskCheckinType.ONEDAY) {
      sql = `
    INSERT INTO checkin_rule (rule_id,task_type, rule_type, days,times,create_by, created_at, status)
    VALUES (?, ?, ?, ?, ?,?,?)
  `;
      params = [ruleId, dto.taskType, dto.ruleType, dto.days, dto.times, userId, new Date(), 2];
    }

    // 如果 sql 存在，就执行：
    if (sql) {
      await queryRunner.query(sql, params);
    }
  }

  async deleteCheckinRule(userId: string, ruleId: string): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      // 可选：开启事务（如果后续操作复杂）
      // await queryRunner.startTransaction();

      const isExist = await this.findCheckinRule(userId, ruleId);
      if (!isExist) return false;

      const sql = `DELETE FROM checkin_rule WHERE rule_id = ? AND create_by = ?`;
      const result = await queryRunner.query(sql, [ruleId, userId]);

      // result 是一个对象数组（对于 DELETE，通常是 affectedRows）
      // 判断是否删除成功
      const affectedRows = result?.affectedRows ?? 0;

      return affectedRows > 0;
    } catch (error) {
      console.error('删除打卡规则失败:', error);
      return false;
    } finally {
      await queryRunner.release();
    }
  }
}
