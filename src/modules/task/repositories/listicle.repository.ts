import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ilisticle } from '@task/entities/interfaces/listicle.interface';
import { Listicle } from '@task/entities/listicle.entity';

import { DataSource, Repository } from 'typeorm';
import { IListicleRepository } from './interfaces/listicle.repository.interface';
import { CreateListicleDto } from '@task/dto/listicle/createListicle.dto';

/**
 * @description
 * @function
 *  findById(id: string): Promise<Listicle | null>; //通过id查询

  //查询个人可见全部清单(包含部门清单+组织清单)
  findAllByUserId(userId: string, organizationId: string, departmentId: string): Promise<Listicle[] | []>; //通过用户id查询全部清单  userid查询psersonal任务清单  organizationId查询组织清单 departmentId查询部门清单
  //查询仅仅是个人清单
  findByUserId(userId: string): Promise<Listicle | null>; //通过用户id查询个人任务所属的清单
  //查询部门公开任务清单
  findBydepartmentId(departmentId: string): Promise<Listicle | null>; //通过部门id查询个人任务所属的清单
  //查询组织公开任务清单

  findByOrganizationId(organizationId: string): Promise<Listicle | null>; //通过组织id查询个人任务所属的清单
  //通过任务查询所属清单
  findByTaskId(taskId: string): Promise<Listicle | null>; //通过任务id查询个人任务所属的清单

  // 创建清单
  //业务层会限制创建
  //限制10条个人清单
  //限15条部门清单
  //限制15条组织清单
  createListicle(createListicle: CreateListicleDto): Promise<Listicle | null>; //增加

  //修改
  updateListicle(listicleId: string, updateListicle: CreateListicleDto): Promise<Listicle | null>; //修改
 */
@Injectable()
export class ListicileRepository implements IListicleRepository {
  constructor(
    @InjectRepository(Listicle)
    private readonly listicleReqo: Repository<Ilisticle>,
    private  readonly dataSource: DataSource
  ) {}

  //通过id查询标签信息

  async findById(id: string): Promise<Listicle | null> {
    try {
      const listicle = await this.dataSource.createQueryBuilder().select('listicle').from(Listicle, 'listicle').where('listicle.listicleId = :listicleId', { listicleId: id }).getOne();

      return listicle || null;
    } catch (error) {
      console.error('Failed to find listicle by id:', error);
      throw new Error(`task module: Failed to find listicle by id:findById(): ${id}`);
    }
  }

  //通过部用户查询
  //获取个人清单
  //获取组织清单的 和个人清单

  async findAllByUserId(userId: string, organizationId: string, departmentId: string): Promise<Listicle[] | []> {
    try {
      const listicels = await this.dataSource
        .createQueryBuilder()
        .select('listicle')
        .from(Listicle, 'listicle')
        .where('listicle.userId=:userId', { userId: userId })
        .leftJoinAndSelect('listicle.organizationId', 'organization')
        .leftJoinAndSelect('listicle.departmentId', 'department')
        .andWhere('listicle.departmentId=:departmentId', { departmentId: departmentId })
        .andWhere('listicle.organizationId=:organizationId', { organizationId: organizationId })
        .getMany();
      return listicels || [];
    } catch (error) {
      console.error('Error finding listicles by userId:', error);
      throw new Error(`task module: Failed to find listicle by id:findByUserId(): ${userId},${organizationId} , ${departmentId}}`);
    }
  }

  //仅仅查询个人清单  
   async findListicleByUserId(userId:string): Promise<Listicle[] | []> {
    try {
      const listicle = await this.dataSource.createQueryBuilder().select('listicle').from(Listicle, 'listicle').where('listicle.userId=:userId', { userId: userId }).getMany();

      return listicle || [];
    } catch (error) {
      console.error('Error finding listicle by userId:', error);
      throw new Error(`task module: Failed to find listicle by id:findByUserId(): ${userId}`);
    }
  }

  async findListicleBydepartmentId(departmentId: string): Promise<Listicle[] | []> {
    try {
      const listicle = await this.dataSource.createQueryBuilder().select('listicle').from(Listicle, 'listicle').where('listicle.departmentId=:departmentId', { departmentId: departmentId }).getMany();

      return listicle || [];
    } catch (error) {
      console.error('Error finding listicle by departmentId:', error);
      throw new Error(`task module: Failed to find listicle by id:findByUserId(): ${departmentId}`);
    }
  }
  findListicleByOrganizationId(organizationId: string): Promise<Listicle[] | []> {
    try {
      return this.dataSource.createQueryBuilder().select('listicle').from(Listicle, 'listicle').where('listicle.organizationId=:organizationId', { organizationId: organizationId }).getMany();
    } catch (error) {
      console.error('Error finding listicle by organizationId:', error);
      throw new Error(`task module: Failed to find listicle by id:findByUserId(): ${organizationId}`);
    }
  }
  //单独获取任务清单
 async findByTaskId(taskId: string): Promise<Listicle | null> {
    try {
      const listicle = await this.dataSource.createQueryBuilder().select('listicle').from(Listicle, 'listicle').where('listicle.listicleId = :taskId', { taskId: taskId }).getOne();

      return listicle || null;
    } catch (error) {
      console.error('Error finding listicle by taskId:', error);
      throw new Error(`task module: Failed to find listicle by id:findByPersonalTaskId(): ${taskId}`);
    }

  }

  //创建清单
 async createListicle(createListicle:CreateListicleDto): Promise<Listicle | null> {
    try {

      const isInset = await this.dataSource.createQueryBuilder().insert().into(Listicle).values(createListicle).returning('*').execute();

    if (isInset && isInset.identifiers.length > 0) {
      return this.dataSource.createQueryBuilder().select('listicle').from(Listicle, 'listicle').where('listicle.listicleId = :listicleId', { listicleId: isInset.identifiers[0].listicleId }).getOne();
    }
    return null;
      
    } catch (error) {
      console.error('Error creating listicle:', error);
      throw new Error(`task module: Failed to create listicle:createListicle()`);
      
    }

  }
  //修改清单
  async updateListicle(listicleId: string, updateListicle: CreateListicleDto): Promise<Listicle | null> {
    try {
      const isUpdate = await this.dataSource.createQueryBuilder().update(Listicle).set(updateListicle).where('listicleId = :listicleId', { listicleId: listicleId }).returning('*').execute();

      if (isUpdate && isUpdate.raw.length > 0) {
        return this.dataSource.createQueryBuilder().select('listicle').from(Listicle, 'listicle').where('listicle.listicleId = :listicleId', { listicleId: isUpdate.raw[0].listicleId }).getOne();
      }
      return null;
    } catch (error) {
      console.error('Error updating listicle:', error);
      throw new Error(`task module: Failed to update listicle:updateListicle(): ${listicleId}`);
    }
  }


}
