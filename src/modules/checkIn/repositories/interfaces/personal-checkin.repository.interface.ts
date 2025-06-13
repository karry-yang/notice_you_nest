import { PaginatedResult } from 'src/common/types/paginatedResult.interface';
import { PersonalCheckin } from '../../entities/personal-checkin.entity';
import { CreatePersonalCheckinDto } from '../../dto/personal-checkin/create-personal-checkin.dto';

export interface IPersonalTaskCheckinRespository {
  //通过id查询
  findById(id: string): Promise<PersonalCheckin | null>;

  //通过userid查询
  findByUserId(userId: string, currentPage: number, pageSize: number): Promise<PaginatedResult<PersonalCheckin>>;
  //通过任务id查询
  findByTaskId(taskId: string, currentPage: number, pageSize: number): Promise<PaginatedResult<PersonalCheckin>>;
  //增加
  createPersonalCheckin(createPersonalCheckin: CreatePersonalCheckinDto): Promise<PersonalCheckin | null>;
  //修改===删除
  deleteById(id: string): Promise<void>;
}
