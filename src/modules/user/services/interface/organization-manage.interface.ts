import { CreateDepartmentDto } from '@user/dto/department/create-department.dto';
import { Department } from '@user/entities/department.entity';
import { Organization } from '@user/entities/organization.entity';
import { User } from '@user/entities/user.entity';

export interface IOrgDepManageService {
  //用户查询所在组织部门信息
  findOrgDepByUserId(userId: string): Promise<Organization | null>;

  //用户加入组织部门
  joinOrg(userId: string, orgCode: string): Promise<User | null>;
  joinDep(userId: string, depId: string): Promise<User | null>;
  //组织管理 普通用户查询所有组织部门信息
  findALlDepsByOrgId(depId: string): Promise<Department[] | []>;
  //组织管理 新增部门
  createDep(createBy: string, createDepartment: CreateDepartmentDto): Promise<Department | null>;
  //组织或者部门管理修改部门信息
  updateDep(UpdateBy: string, createDep: CreateDepartmentDto): Promise<Department | null>;
}
