import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Department } from '@user/entities/department.entity'; // 引入部门
import { ManualAuditableBase } from 'src/common/shared/baseEntity/manualAuditable.entity';
import { IOrganization } from './interfaces/organization.interface';
import { User } from './user.entity';

@Entity('organization')
export class Organization extends ManualAuditableBase implements IOrganization {
    //id
    @PrimaryColumn({ name: 'organization_id' })
    organizationId!: string;

    @Column({ name: "organization_name", type: 'varchar', length: 50, nullable: false })
    organizationName!: string;
    //组织代码
    @Column({ name: "organization_code", length: 8, nullable: false, unique: true })
    organizationCode !: string

    @Column({ name: "leader_id", type: 'bigint', nullable: false })
    leaderId !: string

    //组织logo相对路径
    @Column({ name: "organization_logo", type: 'varchar', length: 255, nullable: true })
    organizationLogo?: string | null; // 允许为null，表示没有设置logo
    //懒加载部门信息
    @OneToMany(() => Department, (department) => department.organization, {
        lazy: true,
    })

    departments?: Promise<Department[]>;

    //懒加载组织领导人信息
    @OneToOne(() => User, { lazy: true })
    @JoinColumn({name:"leader_id"})
    organizationLeader?: User

}
