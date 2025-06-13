import { UpdateOrganizationDto } from '@user/dto/oraganization/update-organization.dto';
import { CreateOrganizationDto } from '@user/dto/oraganization/create-organization.dto';
import { Organization } from '@user/entities/organization.entity';
import { Department } from '@user/entities/department.entity';
import { CreateDepartmentDto } from '@user/dto/department/create-department.dto';
import { UpdateDepartmentDto } from '@user/dto/department/update-department.dto';
import { IOrgDepManageRepository } from './interfaces/org-dep-manage.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { User } from '@user/entities/user.entity';

/**
 * @description 组织持久化
 * @instance   findById(Orgid: bigint): Promise<Organization | null>; //id查询
 * @instance  findByCode(Orgcode: string): Promise<Organization | null>; //organizationCode查询
 * @instance   findBydepartmentId(depId): Promise<Organization | null>; //departmnetId查询
 * @instance   findAll(): Promise<Organization[] | []>; //roleId查询
 * @instance   createOrganization(createOrg: CreateOrganizationDto): Promise<void>; //创建新的权限
 * @instance  updateOrganization(updateOrg: UpdateOrganizationDto): Promise<void>;
 */
export class OrgDepManageRepository implements IOrgDepManageRepository {
  constructor(
    @InjectRepository(Organization)
    private readonly orgRep: Repository<Organization>,
    @InjectRepository(Department)
    private readonly depRep: Repository<Department>,
    private readonly dataSource: DataSource
  ) {}
  async findOrgWithDepWithLeaderByOrgId(orgId: string): Promise<Organization | null> {
    const org = await this.dataSource
      .createQueryBuilder(Organization, 'org')
      .leftJoinAndSelect('org.departments', 'dep')
      .leftJoinAndSelect('org.organizationLeader', 'leader')
      .where('org.organizationId = :orgId', { orgId })
      .andWhere('org.status = :status', { status: 1 })
      .getOne();

    return org || null;
  }

  async findOrgWithDepWithLeaderByOrgCode(Orgcode: string): Promise<Organization | null> {
    const org = await this.dataSource
      .createQueryBuilder(Organization, 'org')
      .leftJoinAndSelect('org.departments', 'dep')
      .leftJoinAndSelect('org.organizationLeader', 'leader')
      .where('org.organizationCode = :Orgcode', { Orgcode })
      .andWhere('org.status = :status', { status: 1 })
      .getOne();

    return org || null;
  }
  async findDepWithOrgWithLeaderByDepId(departmentId: string): Promise<Department | null> {
    const dep = await this.dataSource
      .createQueryBuilder(Department, 'dep')
      .leftJoinAndSelect('dep.leader', 'depleader') // 部门领导
      .leftJoinAndSelect('dep.organization', 'org') // 所属组织
      .leftJoinAndSelect('org.leader', 'orgLeader') // 组织领导
      .where('dep.departmentId = :departmentId', { departmentId })
      .getOne();

    return dep || null;
  }

  //
  async findAllOrgsWithLeader(): Promise<Organization[] | []> {
    const allOrgs = await this.dataSource.createQueryBuilder(Organization, 'org').leftJoinAndSelect('org.leader', 'leader').getMany();
    return allOrgs;
  }
  //@todo  创建组织的时候需要新建组件的清单  并且关联所有的任务
  async createOrganization(orgId: string, orgCode: string, createdBy: string, createOrg: CreateOrganizationDto): Promise<Organization> {
    const newOrg = this.orgRep.create({
      organizationId: orgId,
      organizationCode: orgCode,
      organizationName: createOrg.organizationName,
      leaderId: createOrg.organizationLeaderId,
      organizationLogo: createOrg.organizationLogo ?? null,
      createdBy: createdBy,
      createdAt: new Date(),
    } as DeepPartial<Organization>);

    return await this.orgRep.save(newOrg);
  }

  async updateOrganization(updateOrg: UpdateOrganizationDto): Promise<Organization> {
    const org = await this.orgRep.findOneBy({ organizationId: updateOrg.organizationId });

    if (!org) {
      throw new NotFoundException(`未找到ID为 ${updateOrg.organizationId} 的组织`);
    }

    // 只更新传入的字段（非 undefined）
    Object.entries(updateOrg).forEach(([key, value]) => {
      if (value !== undefined) {
        org[key] = value;
      }
    });

    return await this.orgRep.save(org);
  }

  async findDepWithLeaderByDepId(depId: string): Promise<Department | null> {
    const dep = await this.dataSource.createQueryBuilder(Department, 'dep').leftJoinAndSelect('dep.leader', 'leader').where('dep.departmentId=:depId', { deId: depId }).getOne();
    return dep || null;
  }

  async findAllDepWithLeaderByOrgId(orgId: string): Promise<Department[] | []> {
    const deps = await this.dataSource.createQueryBuilder(Department, 'dep').leftJoinAndSelect('dep.leaderId', 'leader').where('dep.organizationId=:orgId', { orgId: orgId }).getMany();
    return deps || [];
  }
  async createDepartment(createDep: CreateDepartmentDto): Promise<Department | null> {
    throw new Error('Method not implemented.');
  }
  async updateDepartment(updateDep: UpdateDepartmentDto): Promise<Department | null> {
    throw new Error('Method not implemented.');
  }

  async findDepWithOrgByUserId(userId: string): Promise<Organization | null> {
    throw new Error('Method not implemented.');
  }
  async findOrgWithDepByLeaderId(leaderId: string): Promise<Organization | null> {
    const org =await this.dataSource.createQueryBuilder(Organization, 'org').leftJoinAndSelect('org.department', 'dep').where('org.leaderId=:leaderId', { leaderId: leaderId }).getOne();
    return org || null
  }
  async findDepByLeaderId(leaderId: string): Promise<Department[] | null> {
    const deps=await this.dataSource.createQueryBuilder(Department,'dep').where('dep.leaderId=:leaderId',{leaderId:leaderId}).getMany()
    return deps || []
  }
}
