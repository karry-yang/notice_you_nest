import { NestFactory } from '@nestjs/core';
import { HabitGroup } from '@task/entities/habit-group.entity';
import { Listicle } from '@task/entities/listicle.entity';
import { PersonalTaskTag } from '@task/entities/personal-task-tag.entity';
import { PersonalTask } from '@task/entities/personal-task.entity';
import { PublicTaskAssignee } from '@task/entities/public-task-assignee.entity';
import { PublicTaskRector } from '@task/entities/public-task-rector.entity';
import { PublicTask } from '@task/entities/public-task.entity';
import { Tag } from '@task/entities/tag.entity';
import { CheckinRule } from '@task/entities/task-checkin-rule.entity';
import { Department } from '@user/entities/department.entity';
import { Organization } from '@user/entities/organization.entity';
import { Permission } from '@user/entities/permission.entity';
import { RolePermission } from '@user/entities/role-permission.entity';
import { Role } from '@user/entities/role.entity';
import { UserRole } from '@user/entities/user-role.entity';
import { UserSetting } from '@user/entities/user-setting.entity';
import { User } from '@user/entities/user.entity';
import { AppModule } from 'src/app.module';
import { HabitFocus } from 'src/modules/checkIn/entities/habit-focus.entity';
import { PersonalCheckin } from 'src/modules/checkIn/entities/personal-checkin.entity';
import { PublicCheckin } from 'src/modules/checkIn/entities/public-checkin.entity';
import {  de, faker, ro } from '@faker-js/faker';
import { generateSnowflakeId } from '@shared/lib/snowflake';
import { DataSource, DeepPartial } from 'typeorm';
import { RoleTypeEnum } from '@shared/enum/RoleTypeEnum';
import { PermissionRangeEnum } from '@shared/enum/PermissionRangeEnum';
import { PermissionTypeEnum } from '@shared/enum/PermissionTypeEnum';
import { single } from 'rxjs';
import { sign } from 'crypto';
import { PasswordHelper } from '@shared/lib/password.helper';

async function bootstrap() {
  // 创建应用上下文
  // 这里使用 NestFactory.createApplicationContext 来创建一个应用上下文
  const app = await NestFactory.createApplicationContext(AppModule);
  // 获取数据源
  const dataSource = app.get(DataSource);

    if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  

  function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

  //仓库

  //=====用户 角色   权限  组织  部门 设置==========
  // 获取 User 仓库
  const userRepository = dataSource.getRepository(User);
  //获取Role 仓库
  const roleRepository = dataSource.getRepository(Role);
  // 获取 Permission 仓库
  const permissionRepository = dataSource.getRepository(Permission);
  //获取 RolePermission 仓库
  const rolePermissionRepository = dataSource.getRepository(RolePermission);
  //获取 UserRole 仓库
  const userRoleRepository = dataSource.getRepository(UserRole);
  // 获取 Organization 仓库
  const organizationRepository = dataSource.getRepository(Organization);
  // 获取 Department 仓库
  const departmentRepository = dataSource.getRepository(Department);
  // 获取 UserSettingId 仓库
  const userSettingIdRepository = dataSource.getRepository(UserSetting);

  //--=====-=  标签 任务  打卡 专注 打卡规则=============
  // 获取标签仓库
  const tagRepository = dataSource.getRepository(Tag);
  //获取listicle仓库
  const listicleRepository = dataSource.getRepository(Listicle);
  //获取publicTask仓库
  const publicTaskRepository = dataSource.getRepository(PublicTask);
  //获取publicCheckin 仓库
  const publicCheckinRepository = dataSource.getRepository(PublicCheckin);
  //获取publicTaskAssignee 仓库
  const publicTaskAssigneeRepository = dataSource.getRepository(PublicTaskAssignee);
  //获取 publicTaskCreator 仓库
  const publicTaskCreatorRepository = dataSource.getRepository(PublicTaskRector);
  //获取personalTask仓库
  const personalTaskRepository = dataSource.getRepository(PersonalTask);
  //获取personalTag仓库
  const personalTagRepository = dataSource.getRepository(PersonalTaskTag);

  //获取 habit 仓库
  const habitRepository = dataSource.getRepository(HabitFocus);

  //获取 HabtitFocus 仓库
  const habitFocusRepository = dataSource.getRepository(HabitFocus);
  // 获取 CheckinRule 仓库
  const checkinRuleRepository = dataSource.getRepository(CheckinRule);
  //获取 hobitGroup 仓库
  const HabitGroupRepository = dataSource.getRepository(HabitGroup);


  //清空各个表的数据
  // await userRepository.clear();
  // await roleRepository.clear();
  // await permissionRepository.clear();
  // await rolePermissionRepository.clear();
  // await userRoleRepository.clear();
  // await organizationRepository.clear();
  // await departmentRepository.clear();
  // await userSettingIdRepository.clear();
  // await tagRepository.clear();
  // await listicleRepository.clear();
  // await publicTaskRepository.clear();
  // await publicCheckinRepository.clear();
  // await publicTaskAssigneeRepository.clear();
  // await publicTaskCreatorRepository.clear();
  // await personalTaskRepository.clear();
  // await personalTagRepository.clear();
  // await habitRepository.clear();
  // await habitFocusRepository.clear();
  // await checkinRuleRepository.clear();
  // await HabitGroupRepository.clear();

  //随机生成id返回数组
  const generateRandomIds = (count: number): string[] => {
    return Array.from({ length: count }, () => generateSnowflakeId().toString());
  };

  const password = '123456';
// const salt = await PasswordHelper.generateSalt(); // 自定义工具类
const hashedPassword = await PasswordHelper.hashPassword(password);
  //ManualAuditableBase默认数据
  const defaultManualAuditableData = {
    createdBy: 0,
    createdAt: new Date(),
    updatedBy: 0,
    updatedAt: new Date(),
    status: 1, // 默认状态为1（启用）
  };

  //   //生成20个组织领导

  const  base=10
  //   const organizationLeaders: User[] = [];
  //生成200个部门id
  const departmentIds: string[] = generateRandomIds(base *10);

  //生成20个组织
  const organizationIds: string[] = generateRandomIds(base);
  //生成220个用户设置
  const userSettingIds: string[] = [];
  //220个用户
  const depLeaderIds: string[] = generateRandomIds(base *10);
    console.log(JSON.stringify(depLeaderIds))
  const orgLeaderIds: string[] = generateRandomIds(base);
  const userIds: string[] = generateRandomIds(base * 100);
  //生成角色
  const roleIds: string[] = generateRandomIds(5);
  //生成组织管理者权限id
  const orgLeaderPermissionIds: string[]=generateRandomIds(base);
  //生成部门管理者权限id
  const depLeaderPermissionIds: string[]=generateRandomIds(base *10);



  console.log('完成数据初始划')
  //创建组织领导
  const organizationLeaders = orgLeaderIds.map((id,index) => {
    const orgLeaders = userRepository.create({
      //userId
      userId: id,
      //userEmail
      userEmail: faker.internet.email(),
      //userPhone
     userPhone: faker.phone.number({ style: 'international' }),

      //userPassword
      userPassword: hashedPassword,
      //userSalt
      userSalt: faker.string.alphanumeric(64),
      //userName
      userName: faker.person.fullName(),
      //userGender
      userGender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
      //userBirthday
      userBirthday: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }),
      //userAvatar
      userAvatar: faker.image.avatar(),
      //userVipStatus
      userVipStatus: faker.helpers.arrayElement([0, 1, 2, 3, 4, 5, 6, 7, 8]),
      //superiorId
      superiorId: null, // 组织领导没有上级
      //organizationId  把生成的组织id放在这里
      organizationId: null,
      //departmentId
      departmentId: null, // 组织领导没有部门
      //userSettingId
      //userSettingId: 0,
      ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
    }as unknown as DeepPartial<User>);
    // 返回 orgLeaders
    return orgLeaders;
  });

  //插入组织领导
const a=  await userRepository.save(organizationLeaders);
  console.log('完成组织领导数据生成 =========添加组织领导进入user表')
delay (3000)
  //创建组织  通过organizationIds
  const organizations = organizationIds.map((orgId, index) => {
    return organizationRepository.create({
      organizationId: orgId,
      organizationName: faker.company.name(),
      organizationDescription: faker.company.catchPhrase(),
      organizationCode: faker.string.alphanumeric(8).toUpperCase(),
      organizationLogo: faker.image.urlLoremFlickr({ category: 'business' }),
      leaderId: organizationLeaders[index],
      ...defaultManualAuditableData,
    }as unknown as DeepPartial<Organization>);
  });
//插入组织
const b=  await organizationRepository.save(organizations);
  console.log('完成组织数据生成 =========添加组织进入department表')
await delay(3000); // 延迟3秒，确保数据插入完成
  //更新组织leader的organizationId
  const updatedOrganizationLeaders = organizationLeaders.map((leader, index) => ({
    ...leader,
    organizationId: organizations[index].organizationId,
  }));
  // 批量更新组织领导的 organizationId
  const c= await userRepository.save(updatedOrganizationLeaders);
  // console.log(JSON.stringify(updatedOrganizationLeaders))
  console.log('完成组织领导数据修改 =========修改组织领导进入user表')

await delay(3000); // 延迟3秒，确保数据插入完成
  //创建部门领导 随机获取一个更新后的组织领导  生成部门数据   此时departmentId为null
  const departmentLeaders = departmentIds.map((depleaderId,index) => {
    // 随机选一个组织领导（userId + organizationId 是一一对应的）
    // const orgLeader = faker.helpers.arrayElement(updatedOrganizationLeaders);

    const depLeaders = userRepository.create({
      userId: depleaderId,
      userEmail: faker.internet.email(),
      userPhone:faker.phone.number({ style: 'international' }),
      userPassword: hashedPassword,
      userSalt: faker.string.alphanumeric(64),
      userName: faker.person.fullName(),
      userGender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
      userBirthday: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }),
      userAvatar: faker.image.avatar(),
      userVipStatus: faker.helpers.arrayElement([0, 1, 2, 3, 4, 5, 6, 7, 8]),
      superiorId: orgLeaderIds[index % base],
      organizationId: organizationIds[index % base],
      departmentId: null,
   
      //userSettingId: 0,
      ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
    }as unknown as DeepPartial<User>);

    return depLeaders;
  });

    console.log('完成组部门领导数据生成 =========添加部门领导进入user表' + JSON.stringify(departmentLeaders))

  //将部门leader数据插入user  此时departmentId还是null
const d= await userRepository.save(departmentLeaders);
await delay(3000)
  
  // 创建部门   使用提前生成的departmentids
  const departments = departmentIds.map((id,index) => (
    departmentRepository. create ({
    departmentId: id,
    departmentName: faker.commerce.department(),
    departmentDescription: faker.lorem.sentence(),
    organizationId:organizationIds[index % base], // 使用部门领导的 organizationId
    leaderId: departmentLeaders[index].userId, // 使用部门领导的 userId
    ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
  }as unknown as DeepPartial<Department>))
  );

  //插入部门
  const e = await departmentRepository.save(departments);
 await delay(3000); // 延迟1秒，确保数据插入完成
   //更新组织leader的departmentId
  const updatedDepartmentLeaders = departmentLeaders.map((leader, index) => ({
    ...leader,
    departmentId: departmentIds[index],
  }as unknown as DeepPartial<User>));
  // 批量更新组织领导的 organizationId
    // await delay(3000); // 延迟1秒，确保数据插入完成
  await userRepository.save(updatedDepartmentLeaders);
  console.log(JSON.stringify(updatedDepartmentLeaders[50]))
  await delay(3000); // 延迟1秒，确保数据插入完成
 
    
  const commonUsers = userIds.map((userId) => {
    // 随机选一个组织领导（userId + organizationId 是一一对应的）
    const Leader = faker.helpers.arrayElement(updatedDepartmentLeaders);

    const commonUser = userRepository.create({
      userId: userId,
      userEmail: faker.internet.email(),
      userPhone: faker.phone.number({ style: 'international' }),
      userPassword: hashedPassword,
      userSalt: faker.string.alphanumeric(64),
      userName: faker.person.fullName(),
      userGender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
      userBirthday: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }),
      userAvatar: faker.image.avatar(),
      userVipStatus: faker.helpers.arrayElement([0, 1, 2, 3, 4, 5, 6, 7, 8]),
      superiorId: Leader.userId, // 普通用户没有上级
      organizationId: Leader.organizationId, // 普通用户没有组织
      departmentId: Leader.departmentId, // 普通用户没有部门
      //userSettingId: 0,
      ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
    }as unknown as DeepPartial<User>);
    return commonUser;
  });
  //插入普通用户
const f = await userRepository.save(commonUsers);

  //创建角色
  async function createRoles() {
    // 'GUEST',
    //     'USER',
    //     'ADMIN-DEP',
    //     'ADMIN-ORG',
    //     'ADMIN-global'
    const roles = [
      {
        roleId: roleIds[0],
        roleName: '超级管理员',
        roleDescription: '拥有所有权限的超级管理员',
        roleType: RoleTypeEnum.ADMIN_SYS,
      },
      {
        roleId: roleIds[1],
        roleName: '组织管理员',
        roleDescription: '负责组织管理的管理员',
        roleType: RoleTypeEnum.ADMIN_ORG,
      },
      {
        roleId: roleIds[2],
        roleName: '部门管理员',
        roleDescription: '负责部门管理的管理员',
        roleType: RoleTypeEnum.ADMIN_DEP,
      },
      {
        roleId: roleIds[3],
        roleName: '普通用户',
        roleDescription: '普通用户角色',
        roleType: RoleTypeEnum.USER,
      },
      {
        roleId: roleIds[4],
        roleName: '访客',
        roleDescription: '房客角色',
        roleType: RoleTypeEnum.GUEST,
      },
   
    ];

    for (const roleData of roles) {
      const role = roleRepository.create({
        ...roleData,
        ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
      }as unknown as DeepPartial<Role>);
      await roleRepository.save(role);
    }

    return roles
  }
  const roles=  await createRoles();
  await delay(3000); // 延迟1秒，确保数据插入完成
  //创建用户角色
  async function createUserRoles() {
    for (const orgLeader of updatedOrganizationLeaders) {
      const userRole = userRoleRepository.create({
        userRoleId: generateSnowflakeId(), // 使用雪花ID生成唯一的 userRoleId
        userId: orgLeader.userId,
        roleId: roleIds[1], // 使用组织ID作为角色ID
        organizationId: orgLeader.organizationId, // 组织ID
        ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
      }as unknown as DeepPartial<UserRole>);
      await userRoleRepository.save(userRole);
    }

    for (const depLeader of updatedDepartmentLeaders) {
      const userRole = userRoleRepository.create({
        userRoleId: roleIds[2], // 使用雪花ID生成唯一的 userRoleId
        userId: depLeader.userId,
        roleId:  roleIds[2], // 使用部门ID作为角色ID
        organizationId: depLeader.organizationId, // 组织ID
        departmentId: depLeader.departmentId, // 部门ID
        ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
      }as unknown as DeepPartial<UserRole>);
       if(userRole.departmentId===null){
        console.log(userRole)
      }
      await userRoleRepository.save(userRole);
     
    }
    //为普通用户创建用户角色
    for (const commonUser of commonUsers) {
      const userRole = userRoleRepository.create({
        userRoleId: generateSnowflakeId(), // 使用雪花ID生成唯一的 userRoleId
        userId: commonUser.userId,
        roleId: roleIds[3], // 使用普通用户角色ID
        organizationId: commonUser.organizationId, // 组织ID
        departmentId: commonUser.departmentId, // 部门ID
        ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
      }as unknown as DeepPartial<UserRole>);
        if(userRole.departmentId===null){
        console.log(userRole)
      }
      await userRoleRepository.save(userRole);
     
    }
  }

    await createUserRoles();

  // //为组织领导创建用户和角色关联
  // async function createOrganizationLeaderUserRoles() {
  //   for (const orgLeader of updatedOrganizationLeaders) {
  //     const userRole = userRoleRepository.create({
  //       userId: orgLeader.userId,
  //       roleId: orgLeader.organizationId, // 使用组织ID作为角色ID
  //       organizationId:orgLeader.organizationId,
  //       // departmentId:,
  //       ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
  //     }as unknown as DeepPartial<UserRole>);
  //     await userRoleRepository.save(userRole);
  //   }
  // }
  //   //为部门领导创建用户和角色关联
  // async function createDepartmentLeaderUserRoles() {
  //   for (const orgLeader of updatedDepartmentLeaders) {
  //     const userRole = userRoleRepository.create({
  //       userId: orgLeader.userId,
  //       roleId: orgLeader.organizationId, // 使用组织ID作为角色ID
  //       organizationId:orgLeader.organizationId,
  //       departmentId:orgLeader.departmentId,
  //       ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
  //     }as unknown as DeepPartial<UserRole>);
  //     await userRoleRepository.save(userRole);
  //   }
  // }
  // // 为普通用户创建用户和角色关联


  //   async function createCommonUserRoles() {
  //   for (const user of commonUsers) {
  //     const userRole = userRoleRepository.create({
  //       userId: user.userId,
  //       roleId: user.organizationId, // 使用组织ID作为角色ID
  //       organizationId:user.organizationId,
  //       departmentId:user.departmentId,
  //       ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
  //     }as unknown as DeepPartial<UserRole>);
  //     await userRoleRepository.save(userRole);
  //   }
  // }
  //创建权限
  async function createPermissions() {
    const permissions = [
      //查看用户信息  优先级表示的查看的深度  
       { permissionId: generateSnowflakeId(), permissionName: 'view-user-org', permissionCode: 'user.view.org',description: '组织领导级别的查看用户信息的权限', permissionType:  PermissionTypeEnum.READ, permissionRange: PermissionRangeEnum.ORG,permissionPriority:101, },
      { permissionId: generateSnowflakeId(), permissionName: 'view-user-dep', permissionCode: 'user.view.dep',description: '部门领导级别的查看用户信息的权限', permissionType: PermissionTypeEnum.READ, permissionRange: PermissionRangeEnum.DEP,permissionPriority:101 },
      { permissionId: generateSnowflakeId(), permissionName: 'view-user-global', permissionCode: 'user.view.global',description: '系统级别的关联查看用户信息的权限', permissionType:  PermissionTypeEnum.READ, permissionRange: PermissionRangeEnum.GLOBAL,permissionPriority:101 },
      { permissionId: generateSnowflakeId(), permissionName: 'view-user-user', permissionCode: 'user.view.user',description: '用户级别的查看用户信息的权限', permissionType:  PermissionTypeEnum.READ, permissionRange: PermissionRangeEnum.USER ,permissionPriority:101},
     //编辑用户信息  优先级是深度的表示
      { permissionId: generateSnowflakeId(), permissionName: 'edit-user-org', permissionCode: 'user.edit.org',description: '组织领导级别的编辑用户信息的权限', permissionType:  PermissionTypeEnum.EDIT, permissionRange: PermissionRangeEnum.ORG ,permissionPriority:201},
      { permissionId: generateSnowflakeId(), permissionName: 'edit-user-dep', permissionCode: 'user.edit.dep',description: '部门级别领导编辑用户信息的权限', permissionType:  PermissionTypeEnum.EDIT, permissionRange: PermissionRangeEnum.DEP,permissionPriority:201 },
      // { permissionId: generateSnowflakeId(), permissionName: 'edite-user-user', permissionCode: 'user.edit.global',description: '用户级别的编辑用户信息的权限', permissionType:  PermissionTypeEnum.EDIT, permissionRange: PermissionRangeEnum.GLOBAL,permissionPriority:209 },
      { permissionId: generateSnowflakeId(), permissionName: 'edit-user-sys', permissionCode: 'user.edit.global',description: '系统级别的编辑用户信息的权限', permissionType:  PermissionTypeEnum.EDIT, permissionRange: PermissionRangeEnum.GLOBAL,permissionPriority:201 },
    //删除用户信息  系统管理才有彻底删除的能力   其他都是逻辑删除
      { permissionId: generateSnowflakeId(), permissionName: 'delete-user-org', permissionCode: 'user.delete.org',description: '删除用户信息', permissionType:  PermissionTypeEnum.DELETE, permissionRange: PermissionRangeEnum.ORG ,permissionPriority:301},
      { permissionId: generateSnowflakeId(), permissionName: 'delete-user-dep', permissionCode: 'user.delete.dep',description: '删除用户信息', permissionType:  PermissionTypeEnum.DELETE, permissionRange: PermissionRangeEnum.DEP ,permissionPriority:301},
      { permissionId: generateSnowflakeId(), permissionName: 'delete-user-global', permissionCode: 'user.delete.global',description: '删除用户信息', permissionType:  PermissionTypeEnum.DELETE, permissionRange: PermissionRangeEnum.GLOBAL ,permissionPriority:310},
      { permissionId: generateSnowflakeId(), permissionName: 'delete-user-user', permissionCode: 'user.delete.user',description: '删除用户信息', permissionType:  PermissionTypeEnum.DELETE, permissionRange: PermissionRangeEnum.USER,permissionPriority:301 },
      //增加用户 只有组织级别才有用户增加权限
      { permissionId: generateSnowflakeId(), permissionName: 'add-user-org', permissionCode: 'user.add.org',description: '新增用户的权限-新增用户直接继承组织id,不具备部门id', permissionType:  PermissionTypeEnum.Add, permissionRange: PermissionRangeEnum.ORG,permissionPriority:410 },
      { permissionId: generateSnowflakeId(), permissionName: 'add-user-global', permissionCode: 'user.add.global',description: '系统管理新增用户的权限-新增的用户不具备组织部门', permissionType:  PermissionTypeEnum.Add, permissionRange: PermissionRangeEnum.ORG,permissionPriority:401 },


    //增加任务==删除任务
      { permissionId: generateSnowflakeId(), permissionName: 'add-task-rog', permissionCode: 'task.add.org',description: '组织级别的任务发布权限--任务发布选择范围全组织', permissionType:  PermissionTypeEnum.Add, permissionRange: PermissionRangeEnum.ORG ,permissionPriority:510},
      { permissionId: generateSnowflakeId(), permissionName: 'add-task-dep', permissionCode: 'task.add.dep',description: '部门级别的任务编发布权限---任务发布选择范围为部门内部可见', permissionType:  PermissionTypeEnum.Add, permissionRange: PermissionRangeEnum.DEP ,permissionPriority:509},

    //组织查看
      { permissionId: generateSnowflakeId(), permissionName: 'view-org-global', permissionCode: 'org.view.global',description:'系统管理删除组织信息--系统级别',permissionType:PermissionTypeEnum.READ, permissionRange: PermissionRangeEnum.GLOBAL ,permissionPriority:601},
      { permissionId: generateSnowflakeId(), permissionName: 'view-org-global', permissionCode: 'org.view.org',description:'系统管理删除组织信息--组织级别',permissionType:PermissionTypeEnum.READ, permissionRange: PermissionRangeEnum.ORG ,permissionPriority:610},
      //编辑组织
      { permissionId: generateSnowflakeId(), permissionName: 'edit-org-org', permissionCode: 'org.edit.org' ,description:'只有组织管理可以编辑组织信息',permissionType:PermissionTypeEnum.EDIT, permissionRange: PermissionRangeEnum.ORG,permissionPriority:710},
      //删除组织
      { permissionId: generateSnowflakeId(), permissionName: 'delete-org-global', permissionCode: 'org.delete.global',description:'系统管理删除组织信息--系统级别',permissionType:PermissionTypeEnum.DELETE, permissionRange: PermissionRangeEnum.GLOBAL,permissionPriority:810},
      { permissionId: generateSnowflakeId(), permissionName: 'delete-org-org', permissionCode: 'org.delete.org',description:'组织管理删除组织信息--组织级别',permissionType:PermissionTypeEnum.DELETE, permissionRange: PermissionRangeEnum.ORG,permissionPriority:801},

      //部门查看  部门用户查看 部门管理查看  组织管理查看   系统管理查看部门
      { permissionId: generateSnowflakeId(), permissionName: 'view-dep-global', permissionCode: 'dep.view.global',description:'系统管理查看部门信息',permissionType:PermissionTypeEnum.READ, permissionRange: PermissionRangeEnum.GLOBAL,permissionPriority:901},
      { permissionId: generateSnowflakeId(), permissionName: 'view-dep-org', permissionCode: 'dep.view.org',description:'组织管理级别查看部门信息',permissionType:PermissionTypeEnum.READ, permissionRange: PermissionRangeEnum.ORG,permissionPriority:910},
      { permissionId: generateSnowflakeId(), permissionName: 'view-dep-dep', permissionCode: 'dep.view.dep',description:'部门级别管理查看部门信息',permissionType:PermissionTypeEnum.READ, permissionRange: PermissionRangeEnum.DEP,permissionPriority:910},
      { permissionId: generateSnowflakeId(), permissionName: 'view-dep-user', permissionCode: 'dep.view.user',description:'系统管理查看部门信息',permissionType:PermissionTypeEnum.READ, permissionRange: PermissionRangeEnum.USER,permissionPriority:901},

      //部门编辑  组织管理编辑部门   部门管理编辑
     { permissionId: generateSnowflakeId(), permissionName: 'edit-dep-org', permissionCode: 'dep.edit.org',description:'组织管理级别编辑部门信息',permissionType:PermissionTypeEnum.EDIT, permissionRange: PermissionRangeEnum.ORG,permissionPriority:1010},
     { permissionId: generateSnowflakeId(), permissionName: 'edit-dep-dep', permissionCode: 'dep.edit.dep',description:'部门管理级别编辑部门信息',permissionType:PermissionTypeEnum.EDIT, permissionRange: PermissionRangeEnum.ORG,permissionPriority:1001},

      //部门新增  组织管理新增部门   部门管理新增下级部门
    { permissionId: generateSnowflakeId(), permissionName: 'add-dep-org', permissionCode: 'dep.add.org',description:'组织管理级别新增部门信息',permissionType:PermissionTypeEnum.Add, permissionRange: PermissionRangeEnum.ORG,permissionPriority:1110},
    { permissionId: generateSnowflakeId(), permissionName: 'add-dep-dep', permissionCode: 'dep.add.dep',description:'部门管理级别新增部门信息',permissionType:PermissionTypeEnum.Add, permissionRange: PermissionRangeEnum.DEP,permissionPriority:1101},

      //部门删除   组织管理删除部门  系统删除部门
         { permissionId: generateSnowflakeId(), permissionName: 'delete-dep-org', permissionCode: 'dep.delete.org',description:'组织管理级删除部门信息',permissionType:PermissionTypeEnum.DELETE, permissionRange: PermissionRangeEnum.ORG,permissionPriority:1201},
    { permissionId: generateSnowflakeId(), permissionName: 'adelete-dep-global', permissionCode: 'dep.delete.global',description:'系统管理级别删除部门信息',permissionType:PermissionTypeEnum.DELETE, permissionRange: PermissionRangeEnum.GLOBAL,permissionPriority:1210},

    //通知
    //
    ];

    
    for (const permData of permissions) {
      const permission = permissionRepository.create({
        ...permData,
        ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
      }as unknown as DeepPartial<Permission>);
      await permissionRepository.save(permission);
    }

    return permissions
  }



  const permissions=  await createPermissions();
    await delay (3000)
  //创建角色权限
  // async function createRolePermissions(roles:any[],permissions:any[]) {
  
  //   for (const role of roles) {
  //     if(role.roleType===RoleTypeEnum.ADMIN_DEP){
  //      for (const permission of permissions) {
  //      if(permission.permissionRange===PermissionRangeEnum.DEP){
  //        const rolePermission = rolePermissionRepository.create({
  //         rolePermissionId:generateSnowflakeId(),
  //         roleId: role.roleId,
  //         permissionId: permission.permissionId,
  //         ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
  //       }as unknown as DeepPartial<RolePermission>);
  //       await rolePermissionRepository.save(rolePermission);
  //      }
  //     }
  //     }
  //     if(role.roleType===RoleTypeEnum.ADMIN_ORG){
  //             for (const permission of permissions) {
  //      if(permission.permissionRange===PermissionRangeEnum.ORG){
  //        const rolePermission = rolePermissionRepository.create({
  //         rolePermissionId:generateSnowflakeId(),
  //         roleId: role.roleId,
  //         permissionId: permission.permissionId,
  //         ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
  //       }as unknown as DeepPartial<RolePermission>);
  //       await rolePermissionRepository.save(rolePermission);
  //      }
  //     }
  //     }
  //     // if(role.roleType===RoleTypeEnum.ADMIN_SYS)
  //     if(role.roleType===RoleTypeEnum.USER){
  //   for (const permission of permissions) {
  //      if(permission.permissionRange===PermissionRangeEnum.USER){
  //        const rolePermission = rolePermissionRepository.create({
  //         rolePermissionId:generateSnowflakeId(),
  //         roleId: role.roleId,
  //         permissionId: permission.permissionId,
  //         ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
  //       }as unknown as DeepPartial<RolePermission>);
  //       await rolePermissionRepository.save(rolePermission);
  //      }
  //     }
  //   }
  // }
  // }

  async function createRolePermissions(roles: any[], permissions: any[]) {
  for (const role of roles) {
    for (const permission of permissions) {
      const shouldAssign =
        (role.roleType === RoleTypeEnum.ADMIN_DEP && permission.permissionRange === PermissionRangeEnum.DEP) ||
        (role.roleType === RoleTypeEnum.ADMIN_ORG && permission.permissionRange === PermissionRangeEnum.ORG) ||
        (role.roleType === RoleTypeEnum.ADMIN_SYS && permission.permissionRange === PermissionRangeEnum.GLOBAL);

      if (shouldAssign) {
        const rolePermission = rolePermissionRepository.create({
          rolePermissionId: generateSnowflakeId(),
        role:{  roleId: role.roleId},
         permission:{ permissionId: permission.permissionId},
          ...defaultManualAuditableData,
        } as unknown as DeepPartial<RolePermission>);
        await rolePermissionRepository.save(rolePermission);
      }
    }
  }
}

    await createRolePermissions(roles,permissions);
  // createPermissions();
  //创建标签
  // async function createTags() {
  //     const tags = Array.from({ length: 100 }, () => {
  //         return tagRepository.create({
  //             tagId: generateSnowflakeId(),
  //             tagName: faker.lorem.word(),
  //             tagDescription: faker.lorem.sentence(),
  //             ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
  //         });
  //     });
  //     await tagRepository.save(tags);
  // }
  //创建listicle
  // async function createListicles() {
  //     const listicles = Array.from({ length: 50 }, () => {
  //         return listicleRepository.create({
  //             listicleId: generateSnowflakeId(),
  //             listicleTitle: faker.lorem.sentence(),
  //             listicleContent: faker.lorem.paragraphs(3),
  //             userId: faker.helpers.arrayElement(organizationLeaders).userId, // 随机选择一个组织领导
  //             ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
  //         });
  //     });
  //     await listicleRepository.save(listicles);
  // }
  //创建公共任务
  // async function createPublicTasks() {
  //     const publicTasks = Array.from({ length: 50 }, () => {
  //         return publicTaskRepository.create({
  //             taskId: generateSnowflakeId(),
  //             taskTitle: faker.lorem.sentence(),
  //             taskDescription: faker.lorem.paragraphs(2),
  //             taskStatus: faker.helpers.arrayElement(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
  //             taskPriority: faker.helpers.arrayElement(['LOW', 'MEDIUM', 'HIGH']),
  //             userId: faker.helpers.arrayElement(organizationLeaders).userId, // 随机选择一个组织领导
  //             ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
  //         });
  //     });
  //     await publicTaskRepository.save(publicTasks);
  // }
  //创建公开任务负责人关联
  // async function createPublicTaskRectors() {
  //     const publicTasks = await publicTaskRepository.find();
  //     const publicTaskRectors = publicTasks.map(task => {
  //         return publicTaskCreatorRepository.create({
  //             taskId: task.taskId,
  //             userId: faker.helpers.arrayElement(organizationLeaders).userId, // 随机选择一个组织领导
  //             ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
  //         });
  //     });
  //     await publicTaskCreatorRepository.save(publicTaskRectors);
  // }
  //创建公开任务参与者关联
  // async function createPublicTaskAssignees() {
  //     const publicTasks = await publicTaskRepository.find();
  //     const publicTaskAssignees = publicTasks.map(task => {
  //         return publicTaskAssigneeRepository.create({
  //             taskId: task.taskId,
  //             userId: faker.helpers.arrayElement(departmentLeaders).userId, // 随机选择一个部门领导
  //             ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
  //         });
  //     });
  //     await publicTaskAssigneeRepository.save(publicTaskAssignees);
  // }
  //创建公开任务部门关联
  // async function createPublicTaskDepartments() {
  //     const publicTasks = await publicTaskRepository.find();
  //     const publicTaskDepartments = publicTasks.map(task => {
  //         return publicTaskAssigneeRepository.create({
  //             taskId: task.taskId,
  //             departmentId: faker.helpers.arrayElement(departmentIds), // 随机选择一个部门ID
  //             ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
  //         });
  //     });
  //     await publicTaskAssigneeRepository.save(publicTaskDepartments);
  // }

  //创建公开任务打卡规则
  // async function createPublicCheckinRules() {
  //     const publicTasks = await publicTaskRepository.find();
  //     const checkinRules = publicTasks.map(task => {
  //         return checkinRuleRepository.create({
  //             ruleId: generateSnowflakeId(),
  //             taskId: task.taskId,
  //             ruleName: faker.lorem.word(),
  //             ruleDescription: faker.lorem.sentence(),
  //             checkinFrequency: faker.helpers.arrayElement(['DAILY', 'WEEKLY', 'MONTHLY']),
  //             ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
  //         });
  //     });
  //     await checkinRuleRepository.save(checkinRules);
  // }
  //创建私有任务
  // async function createPersonalTasks() {
  //     const personalTasks = Array.from({ length: 100 }, () => {
  //         return personalTaskRepository.create({
  //             taskId: generateSnowflakeId(),
  //             taskTitle: faker.lorem.sentence(),
  //             taskDescription: faker.lorem.paragraphs(2),
  //             taskStatus: faker.helpers.arrayElement(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
  //             taskPriority: faker.helpers.arrayElement(['LOW', 'MEDIUM', 'HIGH']),
  //             userId: faker.helpers.arrayElement(departmentLeaders).userId, // 随机选择一个部门领导
  //             ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
  //         });
  //     });
  //     await personalTaskRepository.save(personalTasks);
  // }
  //创建私有任务标签
  // async function createPersonalTaskTags() {
  //     const personalTasks = await personalTaskRepository.find();
  //     const personalTaskTags = personalTasks.map(task => {
  //         return personalTagRepository.create({
  //             taskId: task.taskId,
  //             tagId: faker.helpers.arrayElement(await tagRepository.find()).tagId, // 随机选择一个标签
  //             ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
  //         });
  //     });
  //     await personalTagRepository.save(personalTaskTags);
  // }
  //创建私有任务打卡规则关联
  // async function createPersonalCheckinRules() {
  //     const personalTasks = await personalTaskRepository.find();
  //     const checkinRules = personalTasks.map(task => {
  //         return checkinRuleRepository.create({
  //             ruleId: generateSnowflakeId(),
  //             taskId: task.taskId,
  //             ruleName: faker.lorem.word(),
  //             ruleDescription: faker.lorem.sentence(),
  //             checkinFrequency: faker.helpers.arrayElement(['DAILY', 'WEEKLY', 'MONTHLY']),
  //             ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
  //         });
  //     });
  //     await checkinRuleRepository.save(checkinRules);
  // }
  //创建习惯
  // async function createHabits() {
  //     const habits = Array.from({ length: 50 }, () => {
  //         return habitRepository.create({
  //             habitId: generateSnowflakeId(),
  //             habitName: faker.lorem.word(),
  //             habitDescription: faker.lorem.sentence(),
  //             userId: faker.helpers.arrayElement(departmentLeaders).userId, // 随机选择一个部门领导
  //             ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
  //         });
  //     });
  //     await habitRepository.save(habits);
  // }

  // 创建习惯分组
  // async function createHabitGroups() {
  //     const habitGroups = Array.from({ length: 20 }, () => {
  //         return HabitGroupRepository.create({
  //             groupId: generateSnowflakeId(),
  //             groupName: faker.lorem.word(),
  //             groupDescription: faker.lorem.sentence(),
  //             userId: faker.helpers.arrayElement(departmentLeaders).userId, // 随机选择一个部门领导
  //             ...defaultManualAuditableData, // 添加默认的 ManualAuditableBase 数据
  //         });
  //     });
  //     await HabitGroupRepository.save(habitGroups);
  // }





  // await createOrganizationLeaderUserRoles();

  console.log('✅ 所有假数据生成并写入数据库成功');
  await app.close();
}

bootstrap()
  .then(() => console.log('✅ 数据库种子脚本执行成功'))
  .catch((error) => console.error('❌ 数据库种子脚本执行失败:', error));