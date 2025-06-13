import { CreateDepartmentDto } from '@user/dto/department/create-department.dto';
import { Department } from '@user/entities/department.entity';
import { Organization } from '@user/entities/organization.entity';
import { User } from '@user/entities/user.entity';
import { IOrgDepManageService } from '../interface/organization-manage.interface';
import { Inject } from '@nestjs/common';
import { IOrgDepManageRepositoryToken } from 'src/common/token/tokens';
import { IOrgDepManageRepository } from '@user/repositories/interfaces/org-dep-manage.repository.interface';

export class OrgDepManageService implements IOrgDepManageService {
  constructor(
    @Inject(IOrgDepManageRepositoryToken)
    private readonly orgDepMangeReposity: IOrgDepManageRepository
  ) {}
  findOrgDepByUserId(userId: string): Promise<Organization | null> {
    throw new Error('Method not implemented.');
  }
  joinOrg(userId: string, orgCode: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  joinDep(userId: string, depId: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  findALlDepsByOrgId(depId: string): Promise<Department[] | []> {
    throw new Error('Method not implemented.');
  }
  createDep(createBy: string, createDepartment: CreateDepartmentDto): Promise<Department | null> {
    throw new Error('Method not implemented.');
  }
  updateDep(UpdateBy: string, createDep: CreateDepartmentDto): Promise<Department | null> {
    throw new Error('Method not implemented.');
  }
}
