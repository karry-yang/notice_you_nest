import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Department } from '@iam/entities/department.entity'; // 引入部门
import { ManualAuditableBase } from '@shared/baseEntity/manualAuditable.entity';
import { IOrganization } from './interfaces/organization.interface';
import { User } from './user.entity';

@Entity('organization')
export class Organization extends ManualAuditableBase implements IOrganization {
    @PrimaryColumn({ name: 'organization_id' })
    organizationId!: bigint;

    @Column({ name: "organization_name", type: 'varchar', length: 50, nullable: false })
    organizationName!: string;
    //组织代码
    @Column({ name: "organization_code", length: 8, nullable: false, unique: true })
    organizationCode !: string

    @Column({ name: "organization_leader_id", type: 'bigint', nullable: false })
    organizationLeaderId !: bigint

    //懒加载部门信息
    @OneToMany(() => Department, (department) => department.organization, {
        lazy: true,
    })
    departments?: Department[];

    //懒加载组织领导人信息
    @OneToOne(() => User, { lazy: true })
    organizationLeader?: User

}
