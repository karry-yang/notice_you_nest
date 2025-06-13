import { PaginatedResult } from "src/common/types/paginatedResult.interface";

export interface IPublicCheckinService{
    //负责人查看所有用户的打卡信息
  findPublicCheckinByIdForRector(id: string, time: Date, nextCursor: { checkin_time: string | null; assingee_id: string | null } | null,limit: number): Promise<PaginatedResult<any>>; //通过id查询任务  获取的是单条数据

}