import { CreateListicleDto } from '@task/dto/listicle/createListicle.dto';
import { Listicle } from '@task/entities/listicle.entity';

/**
 * @description 通过id查询
 * 业务层创建数据限制十条个人清单  15条组织清单   30个部门清单-->所有不需要分页
 */
export interface IListicleRepository {
  findById(id: string): Promise<Listicle | null>; //通过id查询

  
  /**
   * @description 查询个人可见全部清单(包含部门清单+组织清单)
  */
  findAllByUserId(userId: string, organizationId: string, departmentId: string): Promise<Listicle[] | []>; //通过用户id查询全部清单  userid查询psersonal任务清单  organizationId查询组织清单 departmentId查询部门清单
 
    /**
   * @description  查询仅仅是个人任务清单
  */
  findListicleByUserId(userId: string): Promise<Listicle[] | []>; 
/**
 * @description   查询部门公开任务清单
*/
  findListicleBydepartmentId(departmentId: string): Promise<Listicle[] | []>; //通过部门id查询个人任务所属的清单


/**
 * @description   查询组织公开任务清单
*/
  findListicleByOrganizationId(organizationId: string): Promise<Listicle[] | []>; //通过组织id查询个人任务所属的清单

  /**
   *   @description 通过任务查询所属清单
  */
  findByTaskId(taskId: string): Promise<Listicle | null>; //通过任务id查询个人任务所属的清单

/**
 * @description    创建清单
  
  业务层会限制创建
  限制10条个人清单
  限15条部门清单
  限制15条组织清单
*/
  createListicle(listicleId:string,createListicle: CreateListicleDto): Promise<Listicle | null>; //增加

/**
 * @description 修改清单
*/
  updateListicle(listicleId: string, updateListicle: CreateListicleDto): Promise<Listicle | null>; //修改
}
