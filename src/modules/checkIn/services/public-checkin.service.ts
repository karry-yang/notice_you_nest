import { PaginatedResult } from "src/common/types/paginatedResult.interface";
import { IPublicCheckinService } from "./interface/public-checkin-service.interface";
import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { IPublicTaskCheckinServiceToken } from "src/common/token/tokens";


@Injectable()
export class PublicCheckinService implements IPublicCheckinService {

    constructor(
        // @Inject(IPublicTaskCheckinServiceToken)
        // private readonly publicCheckinService:IPublicCheckinService,
        // private   readonly dataSource: DataSource

    ){

    }
  findPublicCheckinByIdForRector(id: string, time: Date, nextCursor: { checkin_time: string | null; assingee_id: string | null; } | null, limit: number): Promise<PaginatedResult<any>> {
    throw new Error("Method not implemented.");
  }
     //个人打卡
    //查看个人打卡日志
    //查看个人打卡信息
    //查看所有的打卡人打卡信息
    //负责人查看打卡信息 
//   async findPublicCheckinByIdForRector(
//   taskId: string,
//   date: Date,
//   nextCursor: { checkin_time: string | null; assingee_id: string | null } | null,
// limit: number=10
// ): Promise<PaginatedResult<any>> {
//   const values: any[] = [date, taskId];

//   let cursorCondition = '';
//   if (nextCursor && nextCursor.checkin_time !== null && nextCursor.assingee_id !== null) {
//     // 使用游标进行分页：先按 checkin_time，再按 assingee_id 排序确保唯一性
//     cursorCondition = `
//       AND (
//         (pc.checkin_time < ?)
//         OR (pc.checkin_time = ? AND pta.assingee_id > ?)
//       )
//     `;
//     values.push(nextCursor.checkin_time, nextCursor.checkin_time, nextCursor.assingee_id);
//   }

//   values.push(limit + 1); // 多取一条判断是否还有下一页

//   const sql = `
//     SELECT 
//       pt.task_id,
//       pta.assingee_id,
//       u.user_name,
//       pc.checkin_time,
//       pc.status,
//       CASE 
//         WHEN pc.public_task_id IS NOT NULL THEN 1
//         ELSE 0
//       END AS is_checked_in
//     FROM public_task pt
//     JOIN public_task_assignee pta ON pt.task_id = pta.public_task_id
//     JOIN user u ON u.user_id = pta.assingee_id
//     LEFT JOIN public_checkin pc 
//       ON pc.public_task_id = pt.task_id 
//       AND pc.user_id = pta.assingee_id
//       AND DATE(pc.checkin_time) = DATE(?)
//     WHERE pt.task_id = ?
//     ${cursorCondition}
//     ORDER BY 
//       pc.checkin_time DESC,
//       pta.assingee_id ASC
//     LIMIT ?
//   `;

//   const results = await this.dataSource.query(sql, values);
// //@todo  加载任务的markdown文档  if has_files  需要调用文件服务获取文件
//   // 判断是否还有下一页
//   const hasNextPage = results.length > limit;
//   const data = hasNextPage ? results.slice(0, limit) : results;

//   const last = data[data.length - 1];

//   return {
//     data:data,
//      hasNextPage: hasNextPage,
//     nextCursor: hasNextPage && last
//         ? JSON.stringify({
//             checkin_time: last.checkin_time,
//             assingee_id: last.assingee_id
//           })
//         : null
    
//   };
// }
    
}