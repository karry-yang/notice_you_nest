import { UpdateOrganizationDto } from '@user/dto/oraganization/update-organization.dto';
import { CreateOrganizationDto } from '@user/dto/oraganization/create-organization.dto';
import { Organization } from '@user/entities/organization.entity';
import { Department } from '@user/entities/department.entity';
import { CreateDepartmentDto } from '@user/dto/department/create-department.dto';
import { UpdateDepartmentDto } from '@user/dto/department/update-department.dto';
import { User } from '@user/entities/user.entity';

/**
 * @description 组织持久化
 * @interface   findById(Orgid: string): Promise<Organization | null>; //id查询
 * @interface  findByCode(Orgcode: string): Promise<Organization | null>; //organizationCode查询
 * @interface   findBydepartmentId(depId:string): Promise<Organization | null>; //departmnetId查询
 * @interface   findAll(): Promise<Organization[] | []>; //roleId查询
 * @interface   createOrganization(createOrg: CreateOrganizationDto): Promise<void>; //创建新的权限
 * @interface  updateOrganization(updateOrg: UpdateOrganizationDto): Promise<void>;
 * @interface  查询部门信息携带临到
 */
export interface IOrgDepManageRepository {

  //--------------org----------------
/**
 * @description 通过orgId查询组织信息 携带部门信息  携带领导信息
*/
  findOrgWithDepWithLeaderByOrgId(Orgid: string): Promise<Organization | null>; //id查询

  /**
 * @description 通过orgCode查询组织信息 携带部门信息  携带领导信息
*/
  findOrgWithDepWithLeaderByOrgCode(Orgcode: string): Promise<Organization | null>; //organizationCode查询



  /**
   *@description 通过部门id查询部门信息包括组织信息 携带leader
  */
  findDepWithOrgWithLeaderByDepId(depId:string): Promise<Department | null>; //departmnetId查询


  /**
   * @description 查询所有的组织信息携带leader  系统管理使用  组织全查询
  */
  findAllOrgsWithLeader(): Promise<Organization[] | []>; 

  /**
   * @description  创建组织
   * @param serviece层生成orgId orgCode  currentUserId as createBy + dto{名字，描述，logo  领导} 
   * @return Organization
  */
  createOrganization(orgID:string,orgCode:string , createdBy:string,createOrg: CreateOrganizationDto): Promise<Organization>; 

  /**
   * @description  修改组织信息
  */
  updateOrganization(updateOrg: UpdateOrganizationDto): Promise<Organization>;



//部门

/**
 * @description 查询部门信息  携带leader
*/
  findDepWithLeaderByDepId(Orgid: string): Promise<Department | null>; //id查询




  /**
   * @description 通过orgId查询所有deps  dep携带leader
  */
  findAllDepWithLeaderByOrgId(orgId:string): Promise<Department[] | []>; 
  

  /**
   * @description 创建Department
  */
  createDepartment(createDep: CreateDepartmentDto): Promise<Department | null>; //创建新的权限

  /**
   * @description 修改部门信息
  */
  updateDepartment(updateDep: UpdateDepartmentDto): Promise<Department| null>;


  /**
   * @description  通过userId查询用户关联的部门(部门携带)
  */
//  findDepWithUserWithUserRole
  // 用户
/**
 * @deprecated 用户查询所在组织和部门情况
 * @returns Organization null
*/
  findDepWithOrgByUserId(userId:string):Promise<Organization| null>

   /**
   * @description 通过leaderid查询组织中管理者身份  返回组织信息
   * @param  leader:string
   * return Organizaion()
  */
   findOrgWithDepByLeaderId(leaderId:string):Promise<Organization | null>
   /**
   * @description 通过leaderid查询组织中管理者身份  返回部门数组信息
   * @param  leader:string
   * @return Department[]
  */
   findDepByLeaderId(leaderId:string):Promise<Department[]| null>
}
