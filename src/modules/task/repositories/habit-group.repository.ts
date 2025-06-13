import { Injectable } from '@nestjs/common';
import { IHabitGroupRepository } from './interfaces/habit-group.repository';
import { DataSource } from 'typeorm';
import { CreateHabitGroupDto } from '@task/dto/habitGroup/createHabitGroup.dto';
import { UpdateHabitGroupDto } from '@task/dto/habitGroup/updateHabitGroup.dto';
import { HabitGroup } from '@task/entities/habit-group.entity';

@Injectable()
export class HabitGroupRepository implements IHabitGroupRepository {
  constructor(private readonly dataSource: DataSource) {}
  async findById(id: string): Promise<HabitGroup | null> {
    const sql = `
        SELECT  *  FROM habit_group WHERE  haboit_group_id=?
    `;

    const data = this.dataSource.query(sql, [id]);
    return data[0] ?? null;
  }
  async fidnByUserId(userId: string): Promise<HabitGroup[] | []> {
    const sql = `
 SELECT * FROM habit_group
 WHERE user_id=?   
    `;
    const result = await this.dataSource.query(sql, [userId]);
    return result;
  }
  async updateHabitGroup(updateHabitGroup: UpdateHabitGroupDto): Promise<HabitGroup | null> {
    throw new Error('Method not implemented.');
  }
  async createHabitGroup(id: string, name: string, userId: string): Promise<HabitGroup | null> {
    throw new Error('Method not implemented.');
  }
}
