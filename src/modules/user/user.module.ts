import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@user/entities/user.entity';
import { UserManageRepository } from '@user/repositories/user-manage.repository';
import { AuthManageRepository } from './repositories/auth-manage.repository';
import { OrgDepManageRepository } from './repositories/org-dep-manage.repository';

import { UserManageService } from '@user/services/user/user-manage.service';
import { AuthManageService } from './services/auth/auth-manage.service';
import { OrgDepManageService } from './services/oraganiztion/org-dep-manage.service';

import {
  IUserManageRepositoryToken,
  IAuthManageRepositoryToken,
  IOrgDepManageRepositoryToken,
  IUserManageServiceToken,
  IAuthManageServiceToken,
  IOrgDepManageServiceToken,
} from '../../common/token/tokens';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { RolePermission } from './entities/role-permission.entity';
import { UserRole } from './entities/user-role.entity';
import { Organization } from './entities/organization.entity';
import { Department } from './entities/department.entity';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { OrgDepController } from './controllers/org-dep.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Role,Permission,RolePermission,UserRole,Organization,Department]),
  ],
  providers: [
    
    {
      provide: IUserManageRepositoryToken,
      useClass: UserManageRepository,
    },
    {
      provide: IAuthManageRepositoryToken,
      useClass: AuthManageRepository,
    },
    {
      provide: IOrgDepManageRepositoryToken,
      useClass: OrgDepManageRepository,
    },
    {
      provide: IUserManageServiceToken,
      useClass: UserManageService,
    },
    {
      provide: IAuthManageServiceToken,
      useClass: AuthManageService,
    },
    {
      provide: IOrgDepManageServiceToken,
      useClass: OrgDepManageService,
    },
  ],
  exports: [
    IUserManageServiceToken,
    IAuthManageServiceToken,
    IOrgDepManageServiceToken,
  ],

  controllers:[UserController,AuthController,OrgDepController]
})
export class UserModule {}
