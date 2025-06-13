import { PaginatedResult } from "src/common/types/paginatedResult.interface";
import { CreatePublicCheckinDto } from "../dto/public-checkin/create-public-checkin.dto";

import { PublicCheckin } from "../entities/public-checkin.entity";
import { IPublicTaskCheckinRespository } from "./interfaces/public-checkin.repository.interface";
import { DataSource,  Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

export class PublicTaskCheckinRepository implements IPublicTaskCheckinRespository {
    constructor(
        @InjectRepository(PublicCheckin)
        private readonly publicCheckinRepo: Repository<PublicCheckin>,  
        private readonly dataSource: DataSource // ✅ 注入 DataSource
    ){}
 async findPublicCheckinByIdForRector(
  taskId: string,
  date: Date,
  nextCursor: { checkin_time: string | null; assingee_id: string | null } | null,
limit: number=10
): Promise<PaginatedResult<any>> {
  const values: any[] = [date, taskId];

  let cursorCondition = '';
  if (nextCursor && nextCursor.checkin_time !== null && nextCursor.assingee_id !== null) {
    // 使用游标进行分页：先按 checkin_time，再按 assingee_id 排序确保唯一性
    cursorCondition = `
      AND (
        (pc.checkin_time < ?)
        OR (pc.checkin_time = ? AND pta.assingee_id > ?)
      )
    `;
    values.push(nextCursor.checkin_time, nextCursor.checkin_time, nextCursor.assingee_id);
  }

  values.push(limit + 1); // 多取一条判断是否还有下一页

  const sql = `
    SELECT 
      pt.task_id,
      pta.assingee_id,
      u.user_name,
      pc.checkin_time,
      pc.status,
      CASE 
        WHEN pc.public_task_id IS NOT NULL THEN 1
        ELSE 0
      END AS is_checked_in
    FROM public_task pt
    JOIN public_task_assignee pta ON pt.task_id = pta.public_task_id
    JOIN user u ON u.user_id = pta.assingee_id
    LEFT JOIN public_checkin pc 
      ON pc.public_task_id = pt.task_id 
      AND pc.user_id = pta.assingee_id
      AND DATE(pc.checkin_time) = DATE(?)
    WHERE pt.task_id = ?
    ${cursorCondition}
    ORDER BY 
      pc.checkin_time DESC,
      pta.assingee_id ASC
    LIMIT ?
  `;

  const results = await this.dataSource.query(sql, values);

  // 判断是否还有下一页
  const hasNextPage = results.length > limit;
  const data = hasNextPage ? results.slice(0, limit) : results;

  const last = data[data.length - 1];

  return {
    data:data,
     hasNextPage: hasNextPage,
    nextCursor: hasNextPage && last
        ? JSON.stringify({
            checkin_time: last.checkin_time,
            assingee_id: last.assingee_id
          })
        : null
    
  };
}
    findById(id: string): Promise<PublicCheckin | null> {
        throw new Error("Method not implemented.");
    }
    findByPublicTaskId(publicTaskId: string, currentPage: number, pageSize: number): Promise<PaginatedResult<PublicCheckin>> {
        throw new Error("Method not implemented.");
    }
    findByUserId(userId: string, currentPage: number, pageSize: number): Promise<PaginatedResult<PublicCheckin>> {
        throw new Error("Method not implemented.");
    }
    createPublicCheckin(createPublicCheckin: CreatePublicCheckinDto): Promise<PublicCheckin | null> {
        throw new Error("Method not implemented.");
    }
    deletePublicCheckinById(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}