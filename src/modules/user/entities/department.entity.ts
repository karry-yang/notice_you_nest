import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn,JoinColumn } from 'typeorm';
import { Organization } from '@user/entities/organization.entity'; // 引入组织
import { User } from './user.entity';
import { IDepartment } from './interfaces/department.interface';
import { ManualAuditableBase } from 'src/common/shared/baseEntity/manualAuditable.entity';

@Entity('department')
export class Department extends ManualAuditableBase implements IDepartment {
  @PrimaryColumn( { name: 'department_id',  type:"bigint"})
  departmentId!: string;

  @Column({ name:"department_name", type: 'varchar', length: 100, nullable: false })
  departmentName!: string;

  @ManyToOne(() => Organization, (organization) => organization.departments, {
    lazy: true,
  })
  @JoinColumn({ name: 'organization_id' }) // 表示 department 表中的字段
  organization ?:  Promise<Organization>;


  @Column({name:"superior_id", type:'bigint',  nullable:true, default: null, comment:'上级部门id'})
  superiorId ?:string
  
  //部门领导id
  @Column({name:"leader_id",  type:"bigint" ,nullable:false})
  leaderId !:string;
  //懒加载部门领导信息
  @OneToOne(()=>User,{lazy:true})
  @JoinColumn({name:"leader_id"})
  departmentUser? :Promise<User | null>
}
