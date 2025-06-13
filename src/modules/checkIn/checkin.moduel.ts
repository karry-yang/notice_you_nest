import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicTaskCheckinRepository } from './repositories/public-checkin.repository';
import { PublicCheckinService } from './services/public-checkin.service';
import { HabitFocus } from './entities/habit-focus.entity';
import { PersonalCheckin } from './entities/personal-checkin.entity';
import { PublicCheckin } from './entities/public-checkin.entity';
import { FocusRepository } from './repositories/focus.repository';
import { PersonalCheckinService } from './services/personal-checkin.service';
import { FocusService } from './services/focus.service';
import {
  IPublicTaskCheckinRepositoryToken,
  IPublicTaskCheckinServiceToken,
  IPersonalTaskCheckinRepositoryToken,
  IPersonalTaskCheckinServiceToken,
  IFocusRepositoryToken,
  IFocusServiceToken,
} from '../../common/token/tokens';
import { TaskModule } from '@task/task.module';
import { RedisServiceForFocus } from '@database/redis/servers/forFocus.service';
import { RedisModule } from '@database/redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HabitFocus, PersonalCheckin, PublicCheckin]), // 注册实体
    forwardRef(() => TaskModule),
       RedisModule
  ],
  providers: [
    // PublicTaskCheckinRepository,
    {
      provide: IPublicTaskCheckinRepositoryToken,
      useClass: PublicTaskCheckinRepository, // 提供接口的实现类
    },
    {
      provide: IPublicTaskCheckinServiceToken,
      useClass: PublicCheckinService, // 提供接口的实现类
    },
    {
      provide: IPersonalTaskCheckinRepositoryToken,
      useClass: PublicTaskCheckinRepository,
    },
    {
      provide: IPersonalTaskCheckinServiceToken,
      useClass: PersonalCheckinService,
    },
    {
      provide: IFocusRepositoryToken,
      useClass: FocusRepository,
    },
    {
      provide: IFocusServiceToken,
      useClass: FocusService,
    },
  ],
  exports: [IPublicTaskCheckinServiceToken, IPersonalTaskCheckinServiceToken, IFocusServiceToken],
})
export class CheckinModule {}
