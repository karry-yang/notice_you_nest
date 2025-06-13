import { PaginatedResult } from "src/common/types/paginatedResult.interface";
import { PublicCheckin } from "../../entities/public-checkin.entity";
import { CreatePublicCheckinDto } from "../../dto/public-checkin/create-public-checkin.dto";

export interface IPublicTaskCheckinRespository{
    //通过id查询
    findById(id: string): Promise<PublicCheckin | null>;
    //通过publictaskid查询所有
    findByPublicTaskId(publicTaskId: string, currentPage: number, pageSize: number): Promise<PaginatedResult<PublicCheckin>>;
    //通过用户id查询个人数据
    findByUserId(userId: string, currentPage: number, pageSize: number): Promise<PaginatedResult<PublicCheckin>>;
    //增加
    createPublicCheckin(createPublicCheckin: CreatePublicCheckinDto): Promise<PublicCheckin | null>;
    //修改==删除
    deletePublicCheckinById(id: string): Promise<void>;
    /**
     * @description   任务负责人获取任务打卡详情
     * @param  id  任务id
     * @param date  时间
     * @param nextCursor   浮标
     * @param limit  默认10
    */
    
    findPublicCheckinByIdForRector(id: string, time: Date, nextCursor: { checkin_time: string | null; assingee_id: string | null } | null,limit: number): Promise<PaginatedResult<any>>; //通过id查询任务  获取的是单条数据

}