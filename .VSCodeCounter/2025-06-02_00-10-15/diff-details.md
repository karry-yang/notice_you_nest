# Diff Details

Date : 2025-06-02 00:10:15

Directory c:\\Users\\karry-yang\\Desktop\\NOTICEYOU-NEXTJS\\notice_you_service_node\\notice_you_service

Total : 51 files,  1424 codes, 512 comments, 236 blanks, all 2172 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [notice\_2025-05-27\_201050.sql](/notice_2025-05-27_201050.sql) | MS SQL | 501 | 78 | 51 | 630 |
| [package-lock.json](/package-lock.json) | JSON | 16 | 0 | 0 | 16 |
| [package.json](/package.json) | JSON | 2 | 0 | 1 | 3 |
| [readMyNote.md](/readMyNote.md) | Markdown | -2 | 2 | 0 | 0 |
| [scripts/seed.ts](/scripts/seed.ts) | TypeScript | 344 | 364 | 71 | 779 |
| [src/common/dto/paginatedResult.dto.ts](/src/common/dto/paginatedResult.dto.ts) | TypeScript | 41 | 0 | 6 | 47 |
| [src/common/dto/timestamp.dto.ts](/src/common/dto/timestamp.dto.ts) | TypeScript | 13 | 1 | 2 | 16 |
| [src/common/shared/enum/PermissionRangeEnum.ts](/src/common/shared/enum/PermissionRangeEnum.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [src/common/shared/enum/PermissionTypeEnum.ts](/src/common/shared/enum/PermissionTypeEnum.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/common/shared/lib/password.helper.ts](/src/common/shared/lib/password.helper.ts) | TypeScript | -6 | 18 | 4 | 16 |
| [src/common/types/paginatedResult.dto.ts](/src/common/types/paginatedResult.dto.ts) | TypeScript | -34 | -25 | -10 | -69 |
| [src/common/types/paginatedResult.interface.ts](/src/common/types/paginatedResult.interface.ts) | TypeScript | 34 | 27 | 10 | 71 |
| [src/common/utils/cursor.utils.ts](/src/common/utils/cursor.utils.ts) | TypeScript | 18 | 0 | 5 | 23 |
| [src/modules/auth/controller/public-auth.controller.ts](/src/modules/auth/controller/public-auth.controller.ts) | TypeScript | 2 | 0 | 0 | 2 |
| [src/modules/checkIn/checkin.moduel.ts](/src/modules/checkIn/checkin.moduel.ts) | TypeScript | 3 | 0 | 0 | 3 |
| [src/modules/checkIn/controllers/focus.controller.ts](/src/modules/checkIn/controllers/focus.controller.ts) | TypeScript | 40 | 4 | 4 | 48 |
| [src/modules/checkIn/controllers/personal-checkin.controller.ts](/src/modules/checkIn/controllers/personal-checkin.controller.ts) | TypeScript | 10 | 0 | 2 | 12 |
| [src/modules/checkIn/controllers/public-checkin.controller.ts](/src/modules/checkIn/controllers/public-checkin.controller.ts) | TypeScript | 0 | 0 | 1 | 1 |
| [src/modules/checkIn/dto/focus/create-focus.dto.ts](/src/modules/checkIn/dto/focus/create-focus.dto.ts) | TypeScript | 3 | -3 | 2 | 2 |
| [src/modules/checkIn/dto/focus/endFocus.dto.ts](/src/modules/checkIn/dto/focus/endFocus.dto.ts) | TypeScript | 13 | 2 | 6 | 21 |
| [src/modules/checkIn/dto/focus/startFocus.dto.ts](/src/modules/checkIn/dto/focus/startFocus.dto.ts) | TypeScript | 10 | 1 | 5 | 16 |
| [src/modules/checkIn/repositories/focus.repository.ts](/src/modules/checkIn/repositories/focus.repository.ts) | TypeScript | 57 | 0 | 3 | 60 |
| [src/modules/checkIn/repositories/interfaces/focus.repository.interface.ts](/src/modules/checkIn/repositories/interfaces/focus.repository.interface.ts) | TypeScript | 5 | 32 | 4 | 41 |
| [src/modules/checkIn/services/focus.service.ts](/src/modules/checkIn/services/focus.service.ts) | TypeScript | 33 | 6 | 7 | 46 |
| [src/modules/checkIn/services/interface/focus-service.interface.ts](/src/modules/checkIn/services/interface/focus-service.interface.ts) | TypeScript | 3 | 7 | 2 | 12 |
| [src/modules/checkIn/services/interface/personal-checkin-service.interface.ts](/src/modules/checkIn/services/interface/personal-checkin-service.interface.ts) | TypeScript | 2 | 0 | 1 | 3 |
| [src/modules/checkIn/services/personal-checkin.service.ts](/src/modules/checkIn/services/personal-checkin.service.ts) | TypeScript | -14 | 0 | 1 | -13 |
| [src/modules/database/redis/redis.module.ts](/src/modules/database/redis/redis.module.ts) | TypeScript | 2 | 0 | 0 | 2 |
| [src/modules/database/redis/servers/forFocus.service.ts](/src/modules/database/redis/servers/forFocus.service.ts) | TypeScript | 30 | 12 | 7 | 49 |
| [src/modules/task/controllers/habit.controller.ts](/src/modules/task/controllers/habit.controller.ts) | TypeScript | 14 | 10 | 4 | 28 |
| [src/modules/task/controllers/personal-task.controller.ts](/src/modules/task/controllers/personal-task.controller.ts) | TypeScript | 16 | 6 | 2 | 24 |
| [src/modules/task/dto/habitTask/createHabitTask.dto.ts](/src/modules/task/dto/habitTask/createHabitTask.dto.ts) | TypeScript | 3 | -1 | 1 | 3 |
| [src/modules/task/dto/personalTask/personalTaskWithPagination.responseDto.ts](/src/modules/task/dto/personalTask/personalTaskWithPagination.responseDto.ts) | TypeScript | 16 | 0 | 5 | 21 |
| [src/modules/task/dto/personalTask/personalTasksWithListicleTag.dto.ts](/src/modules/task/dto/personalTask/personalTasksWithListicleTag.dto.ts) | TypeScript | 10 | 0 | 2 | 12 |
| [src/modules/task/dto/personalTask/psersonal-task-filter.dto.ts](/src/modules/task/dto/personalTask/psersonal-task-filter.dto.ts) | TypeScript | 58 | 0 | 11 | 69 |
| [src/modules/task/repositories/habit-group.reposicory.ts](/src/modules/task/repositories/habit-group.reposicory.ts) | TypeScript | 6 | 0 | 0 | 6 |
| [src/modules/task/repositories/habit-task.repository.ts](/src/modules/task/repositories/habit-task.repository.ts) | TypeScript | 43 | 1 | 5 | 49 |
| [src/modules/task/repositories/interfaces/habit-task.repository.interface.ts](/src/modules/task/repositories/interfaces/habit-task.repository.interface.ts) | TypeScript | 2 | 4 | 2 | 8 |
| [src/modules/task/repositories/interfaces/personal-task.repository.interface.ts](/src/modules/task/repositories/interfaces/personal-task.repository.interface.ts) | TypeScript | 3 | 3 | 1 | 7 |
| [src/modules/task/repositories/personal-task.repository.ts](/src/modules/task/repositories/personal-task.repository.ts) | TypeScript | 122 | -99 | 8 | 31 |
| [src/modules/task/services/habit-task.service.ts](/src/modules/task/services/habit-task.service.ts) | TypeScript | 15 | 2 | -2 | 15 |
| [src/modules/task/services/interface/habit-task.interface.ts](/src/modules/task/services/interface/habit-task.interface.ts) | TypeScript | 3 | 6 | 6 | 15 |
| [src/modules/task/services/interface/personal-task.interface.ts](/src/modules/task/services/interface/personal-task.interface.ts) | TypeScript | 0 | 19 | 2 | 21 |
| [src/modules/task/task.module.ts](/src/modules/task/task.module.ts) | TypeScript | 7 | 3 | 1 | 11 |
| [src/modules/user/entities/department.entity.ts](/src/modules/user/entities/department.entity.ts) | TypeScript | 2 | 0 | 1 | 3 |
| [src/modules/user/entities/interfaces/department.interface.ts](/src/modules/user/entities/interfaces/department.interface.ts) | TypeScript | 1 | 0 | -1 | 0 |
| [src/modules/user/entities/interfaces/permission.interface.ts](/src/modules/user/entities/interfaces/permission.interface.ts) | TypeScript | 0 | 1 | 0 | 1 |
| [src/modules/user/entities/interfaces/user.interface.ts](/src/modules/user/entities/interfaces/user.interface.ts) | TypeScript | -2 | 2 | 0 | 0 |
| [src/modules/user/entities/permission.entity.ts](/src/modules/user/entities/permission.entity.ts) | TypeScript | 0 | 2 | 1 | 3 |
| [src/modules/user/entities/user.entity.ts](/src/modules/user/entities/user.entity.ts) | TypeScript | -22 | 23 | 0 | 1 |
| [src/modules/user/repositories/user-manage.repository.ts](/src/modules/user/repositories/user-manage.repository.ts) | TypeScript | -4 | 4 | 0 | 0 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details