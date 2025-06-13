import { CreateListicleDto } from '@task/dto/listicle/createListicle.dto';
import { UpdateListicleDto } from '@task/dto/listicle/updateListicle.dto';
import { Listicle } from '@task/entities/listicle.entity';

export interface IListService {
  //查询单个清单携带任务
  getListicleWithTask(listicleId:string): Promise<Listicle | null>;
  //获取个人可见清单  包括组织部门清单  
  getListicleByUserId(userId:string):Promise<Listicle[] | []>
  //创建任务清单，绑定用户或者用户群体
  createListicle(createListicleDto:CreateListicleDto):Promise<Listicle | null>
  //删除任务清单
  deleteListicle(ListicleId:string):Promise< boolean>
  //修改任务清单
  updateListicel(updateListicle:UpdateListicleDto)
}
