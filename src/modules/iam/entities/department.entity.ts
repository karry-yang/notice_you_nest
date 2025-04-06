import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { Organization } from '@iam/entities/organization.entity'; // 引入组织
import { User } from './user.entity';

@Entity('department')
export class Department {
  @PrimaryColumn( { name: 'department_id' })
  departmentId!: bigint;

  @Column({ type: 'varchar', length: 100, nullable: false })
  departmentName!: string;

  @ManyToOne(() => Organization, (organization) => organization.departments, {
    lazy: true,
  })
  organization ?: Organization;

  
  //部门领导id
  @Column({name:"department_leader_id",  type:"bigint" ,nullable:false})
  departmentLeaderId !:bigint;
  //懒加载部门领导信息
  @OneToOne(()=>User,{lazy:true})
  departmentUser? :User
}
