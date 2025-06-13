import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalTask } from './entities/personal-task.entity';
import { PublicTask } from './entities/public-task.entity';
import { Listicle } from './entities/listicle.entity';
import { PersonalTaskTag } from './entities/personal-task-tag.entity';
import { PublicTaskAssignee } from './entities/public-task-assignee.entity';
import { PublicTaskRector } from './entities/public-task-rector.entity';
import { HabitTask } from './entities/habit-task.entity';
import { HabitGroup } from './entities/habit-group.entity';
import { PublicTaskRepository } from './repositories/public-task.repository';
import { PublicTaskService } from './services/public-task.service';
import { MongodbModule } from '@database/mongodb/mongodb.module';
// import { FocusService } from '../checkIn/services/focus.service';
import { CheckinModule } from '../checkIn/checkin.moduel';
import { PersonalTaskService } from './services/personal-task.service';
import { PersonalTaskRepository } from './repositories/personal-task.repository';
import { HabitTaskService } from './services/habit-task.service';
import {
IPublicTaskRepositoryToken,
IPublicTaskServiceToken,
IPersonalTaskRepositoryToken,
IPersonalTaskServiceToken,
IHabitTaskRepositoryToken,
IHabitTaskServiceToken,
IHabitGroupRepositoryToken,

} from '../../common/token/tokens';
import { PublicController } from '@auth/controller/public-auth.controller';
import { PublicTaskController } from './controllers/public-task.controller';
import { PersonalTaskController } from './controllers/personal-task.controller';
import { HabitController } from './controllers/habit.controller';
import { UserModule } from '@user/user.module';
import { DatabaseModule } from '@database/database.module';
import { HabitGroupRepository } from './repositories/habit-group.repository';
import { HabitTaskRepository } from './repositories/habit-task.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonalTask,PublicTask,Listicle,PersonalTaskTag,PublicTaskAssignee,PublicTaskRector,HabitTask,HabitGroup]), // 注册实体
    MongodbModule,
    forwardRef(() => CheckinModule),
     UserModule,
     DatabaseModule
  ],
  providers: [
    //公开任务
    {
      provide: IPublicTaskRepositoryToken,
      useClass: PublicTaskRepository, // 提供接口的实现类
    },
    {
      provide: IPublicTaskServiceToken,
      useClass: PublicTaskService, // 提供接口的实现类
    },
    //私有任务
    {
      provide: IPersonalTaskRepositoryToken,
      useClass: PersonalTaskRepository, // 提供接口的实现类
    },
    {
      provide: IPersonalTaskServiceToken,
      useClass: PersonalTaskService, // 提供接口的实现类
    },

    //习惯
    {
      provide: IHabitTaskRepositoryToken,
      useClass: HabitTaskRepository, // 提供接口的实现类
    },
    {
      provide: IHabitTaskServiceToken,
      useClass: HabitTaskService, // 提供接口的实现类
    },
    //习惯分组
        {
      provide: IHabitGroupRepositoryToken,
      useClass: HabitGroupRepository, // 提供接口的实现类
    },
    
  ],
  exports: [IPublicTaskServiceToken,IPersonalTaskServiceToken,IHabitTaskServiceToken],
  controllers:[PublicTaskController,PersonalTaskController,HabitController]
})
export class TaskModule {}
