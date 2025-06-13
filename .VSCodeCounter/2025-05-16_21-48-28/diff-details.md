# Diff Details

Date : 2025-05-16 21:48:28

Directory c:\\Users\\karry-yang\\Desktop\\NOTICEYOU-NEXTJS\\notice_you_service_node\\notice_you_service

Total : 99 files,  757 codes, 622 comments, 234 blanks, all 1613 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [package-lock.json](/package-lock.json) | JSON | 1 | 0 | 0 | 1 |
| [package.json](/package.json) | JSON | 1 | 0 | 0 | 1 |
| [src/common/decorators/permission.decorator.ts](/src/common/decorators/permission.decorator.ts) | TypeScript | 3 | 1 | 4 | 8 |
| [src/common/dto/cache-role-permission.dto.ts](/src/common/dto/cache-role-permission.dto.ts) | TypeScript | 4 | 0 | 0 | 4 |
| [src/common/dto/role-with-permissions.dto.ts](/src/common/dto/role-with-permissions.dto.ts) | TypeScript | 4 | 1 | 0 | 5 |
| [src/common/guards/permission.guard.ts](/src/common/guards/permission.guard.ts) | TypeScript | 40 | 7 | 10 | 57 |
| [src/common/guards/roles.guard.ts](/src/common/guards/roles.guard.ts) | TypeScript | 3 | 4 | 5 | 12 |
| [src/common/shared/baseEntity/manualAuditable.entity.ts](/src/common/shared/baseEntity/manualAuditable.entity.ts) | TypeScript | 0 | 0 | 1 | 1 |
| [src/common/shared/enum/PermissionRangeEnum.ts](/src/common/shared/enum/PermissionRangeEnum.ts) | TypeScript | -1 | 0 | 1 | 0 |
| [src/common/shared/enum/PermissionTypeEnum.ts](/src/common/shared/enum/PermissionTypeEnum.ts) | TypeScript | -3 | -4 | 0 | -7 |
| [src/common/shared/enum/RoleTypeEnum.ts](/src/common/shared/enum/RoleTypeEnum.ts) | TypeScript | 7 | 0 | 1 | 8 |
| [src/common/shared/enum/SystemUserTypeEnum.ts](/src/common/shared/enum/SystemUserTypeEnum.ts) | TypeScript | -7 | 0 | -1 | -8 |
| [src/common/token/tokens.ts](/src/common/token/tokens.ts) | TypeScript | 16 | 10 | 13 | 39 |
| [src/common/types/paginatedResult.dto.ts](/src/common/types/paginatedResult.dto.ts) | TypeScript | 27 | 25 | 9 | 61 |
| [src/modules/auth/auth.module.ts](/src/modules/auth/auth.module.ts) | TypeScript | 15 | 0 | -1 | 14 |
| [src/modules/auth/controller/public-auth.controller.ts](/src/modules/auth/controller/public-auth.controller.ts) | TypeScript | 0 | 1 | 2 | 3 |
| [src/modules/checkIn/checkin.moduel.ts](/src/modules/checkIn/checkin.moduel.ts) | TypeScript | 31 | 1 | 6 | 38 |
| [src/modules/checkIn/repositories/focus.repository.ts](/src/modules/checkIn/repositories/focus.repository.ts) | TypeScript | 37 | 3 | 8 | 48 |
| [src/modules/checkIn/repositories/interfaces/public-checkin.repository.interface.ts](/src/modules/checkIn/repositories/interfaces/public-checkin.repository.interface.ts) | TypeScript | 1 | 7 | 2 | 10 |
| [src/modules/checkIn/repositories/public-checkin.repository.ts](/src/modules/checkIn/repositories/public-checkin.repository.ts) | TypeScript | 58 | 2 | 8 | 68 |
| [src/modules/checkIn/services/focus.service.ts](/src/modules/checkIn/services/focus.service.ts) | TypeScript | 24 | 1 | 3 | 28 |
| [src/modules/checkIn/services/interface/focus-service.interface.ts](/src/modules/checkIn/services/interface/focus-service.interface.ts) | TypeScript | 8 | 3 | 1 | 12 |
| [src/modules/checkIn/services/interface/public-checkin-service.interface.ts](/src/modules/checkIn/services/interface/public-checkin-service.interface.ts) | TypeScript | 4 | 1 | 2 | 7 |
| [src/modules/checkIn/services/personal-checkin.service.ts](/src/modules/checkIn/services/personal-checkin.service.ts) | TypeScript | 2 | 3 | 0 | 5 |
| [src/modules/checkIn/services/public-checkin.service.ts](/src/modules/checkIn/services/public-checkin.service.ts) | TypeScript | 71 | 8 | 13 | 92 |
| [src/modules/database/mongodb/mongodb.interface.ts](/src/modules/database/mongodb/mongodb.interface.ts) | TypeScript | 2 | 21 | 4 | 27 |
| [src/modules/database/mongodb/mongodb.service.ts](/src/modules/database/mongodb/mongodb.service.ts) | TypeScript | 7 | 0 | 3 | 10 |
| [src/modules/database/redis/servers/forAuth.service.ts](/src/modules/database/redis/servers/forAuth.service.ts) | TypeScript | 42 | 16 | 10 | 68 |
| [src/modules/database/redis/servers/redis.service.ts](/src/modules/database/redis/servers/redis.service.ts) | TypeScript | 2 | 0 | -4 | -2 |
| [src/modules/task/controllers/habit.controller.ts](/src/modules/task/controllers/habit.controller.ts) | TypeScript | 33 | 6 | 3 | 42 |
| [src/modules/task/controllers/listicle.controller.ts](/src/modules/task/controllers/listicle.controller.ts) | TypeScript | 28 | 1 | 4 | 33 |
| [src/modules/task/controllers/personal-task.controller.ts](/src/modules/task/controllers/personal-task.controller.ts) | TypeScript | 0 | 0 | 1 | 1 |
| [src/modules/task/controllers/public-task.controller.ts](/src/modules/task/controllers/public-task.controller.ts) | TypeScript | 1 | 2 | 12 | 15 |
| [src/modules/task/controllers/tag.controller.ts](/src/modules/task/controllers/tag.controller.ts) | TypeScript | 19 | 1 | 2 | 22 |
| [src/modules/task/dto/habitGroup/createHabitGroup.dto.ts](/src/modules/task/dto/habitGroup/createHabitGroup.dto.ts) | TypeScript | 0 | -3 | 2 | -1 |
| [src/modules/task/dto/habitTask/habitWithDetail.dto.ts](/src/modules/task/dto/habitTask/habitWithDetail.dto.ts) | TypeScript | 8 | 5 | 7 | 20 |
| [src/modules/task/dto/habitTask/updateHabitTask.dto.ts](/src/modules/task/dto/habitTask/updateHabitTask.dto.ts) | TypeScript | 1 | 0 | -1 | 0 |
| [src/modules/task/dto/listicle/updateListicle.dto.ts](/src/modules/task/dto/listicle/updateListicle.dto.ts) | TypeScript | 5 | 0 | 3 | 8 |
| [src/modules/task/dto/personalTask/createPersonalTask.dto.ts](/src/modules/task/dto/personalTask/createPersonalTask.dto.ts) | TypeScript | 34 | 0 | 13 | 47 |
| [src/modules/task/dto/personalTask/updatePersonalTask.dto.ts](/src/modules/task/dto/personalTask/updatePersonalTask.dto.ts) | TypeScript | 5 | 0 | 2 | 7 |
| [src/modules/task/dto/publicTask/updatePublicTask.dto.ts](/src/modules/task/dto/publicTask/updatePublicTask.dto.ts) | TypeScript | 2 | 0 | 0 | 2 |
| [src/modules/task/dto/tag/createTag.dto.ts](/src/modules/task/dto/tag/createTag.dto.ts) | TypeScript | 15 | 0 | 5 | 20 |
| [src/modules/task/dto/tag/updateTag.dto.ts](/src/modules/task/dto/tag/updateTag.dto.ts) | TypeScript | 8 | 0 | 2 | 10 |
| [src/modules/task/entities/habit-task.entity.ts](/src/modules/task/entities/habit-task.entity.ts) | TypeScript | 2 | 0 | 0 | 2 |
| [src/modules/task/entities/interfaces/personal-task.interface.ts](/src/modules/task/entities/interfaces/personal-task.interface.ts) | TypeScript | 2 | 0 | -1 | 1 |
| [src/modules/task/entities/interfaces/public-task-assignee.interface.ts](/src/modules/task/entities/interfaces/public-task-assignee.interface.ts) | TypeScript | 0 | 0 | 1 | 1 |
| [src/modules/task/entities/interfaces/public-task-cretor.interface.ts](/src/modules/task/entities/interfaces/public-task-cretor.interface.ts) | TypeScript | -12 | -1 | -7 | -20 |
| [src/modules/task/entities/interfaces/public-task-rector.interface.ts](/src/modules/task/entities/interfaces/public-task-rector.interface.ts) | TypeScript | 10 | 1 | 4 | 15 |
| [src/modules/task/entities/interfaces/public-task.interface.ts](/src/modules/task/entities/interfaces/public-task.interface.ts) | TypeScript | 1 | -1 | 0 | 0 |
| [src/modules/task/entities/interfaces/tag.interface.ts](/src/modules/task/entities/interfaces/tag.interface.ts) | TypeScript | 2 | 0 | 0 | 2 |
| [src/modules/task/entities/personal-task-tag.entity.ts](/src/modules/task/entities/personal-task-tag.entity.ts) | TypeScript | 4 | 0 | 1 | 5 |
| [src/modules/task/entities/personal-task.entity.ts](/src/modules/task/entities/personal-task.entity.ts) | TypeScript | 0 | 2 | 0 | 2 |
| [src/modules/task/entities/public-task-cretor.entity.ts](/src/modules/task/entities/public-task-cretor.entity.ts) | TypeScript | -19 | -1 | -5 | -25 |
| [src/modules/task/entities/public-task-rector.entity.ts](/src/modules/task/entities/public-task-rector.entity.ts) | TypeScript | 19 | 1 | 5 | 25 |
| [src/modules/task/entities/public-task.entity.ts](/src/modules/task/entities/public-task.entity.ts) | TypeScript | 2 | 0 | -5 | -3 |
| [src/modules/task/entities/tag.entity.ts](/src/modules/task/entities/tag.entity.ts) | TypeScript | 2 | 0 | 0 | 2 |
| [src/modules/task/entities/task-checkin-rule.entity.ts](/src/modules/task/entities/task-checkin-rule.entity.ts) | TypeScript | -1 | 1 | 0 | 0 |
| [src/modules/task/repositories/habit-task.repository.ts](/src/modules/task/repositories/habit-task.repository.ts) | TypeScript | 66 | -1 | 18 | 83 |
| [src/modules/task/repositories/interfaces/habit-group.repository.ts](/src/modules/task/repositories/interfaces/habit-group.repository.ts) | TypeScript | 1 | 11 | 0 | 12 |
| [src/modules/task/repositories/interfaces/habit-task.repository.interface.ts](/src/modules/task/repositories/interfaces/habit-task.repository.interface.ts) | TypeScript | 1 | 14 | 5 | 20 |
| [src/modules/task/repositories/interfaces/listicle.repository.interface.ts](/src/modules/task/repositories/interfaces/listicle.repository.interface.ts) | TypeScript | 0 | 15 | 4 | 19 |
| [src/modules/task/repositories/interfaces/personal-task.repository.interface.ts](/src/modules/task/repositories/interfaces/personal-task.repository.interface.ts) | TypeScript | -1 | 10 | 3 | 12 |
| [src/modules/task/repositories/interfaces/public-task.repository.interface.ts](/src/modules/task/repositories/interfaces/public-task.repository.interface.ts) | TypeScript | 21 | 62 | 1 | 84 |
| [src/modules/task/repositories/interfaces/tag.repository.interface.ts](/src/modules/task/repositories/interfaces/tag.repository.interface.ts) | TypeScript | 2 | 14 | 0 | 16 |
| [src/modules/task/repositories/personal-task.repository.ts](/src/modules/task/repositories/personal-task.repository.ts) | TypeScript | -83 | 106 | 3 | 26 |
| [src/modules/task/repositories/public-task.repository.ts](/src/modules/task/repositories/public-task.repository.ts) | TypeScript | -150 | 70 | -6 | -86 |
| [src/modules/task/repositories/tag.repository.ts](/src/modules/task/repositories/tag.repository.ts) | TypeScript | 25 | 2 | -1 | 26 |
| [src/modules/task/services/habit-task.service.ts](/src/modules/task/services/habit-task.service.ts) | TypeScript | 45 | 3 | 6 | 54 |
| [src/modules/task/services/interface/habit-task.interface.ts](/src/modules/task/services/interface/habit-task.interface.ts) | TypeScript | 11 | 13 | 5 | 29 |
| [src/modules/task/services/interface/listicle.interface.ts](/src/modules/task/services/interface/listicle.interface.ts) | TypeScript | 10 | 5 | 1 | 16 |
| [src/modules/task/services/interface/personal-task.interface.ts](/src/modules/task/services/interface/personal-task.interface.ts) | TypeScript | 11 | 5 | 1 | 17 |
| [src/modules/task/services/interface/public-task.interface.ts](/src/modules/task/services/interface/public-task.interface.ts) | TypeScript | 3 | 29 | -12 | 20 |
| [src/modules/task/services/interface/tag.interface.ts](/src/modules/task/services/interface/tag.interface.ts) | TypeScript | 9 | 12 | 5 | 26 |
| [src/modules/task/services/listicle.service.ts](/src/modules/task/services/listicle.service.ts) | TypeScript | 29 | 0 | 1 | 30 |
| [src/modules/task/services/personal-task.service.ts](/src/modules/task/services/personal-task.service.ts) | TypeScript | 30 | 7 | 2 | 39 |
| [src/modules/task/services/public-task.service.ts](/src/modules/task/services/public-task.service.ts) | TypeScript | 54 | 10 | 8 | 72 |
| [src/modules/task/services/tag.serviece.ts](/src/modules/task/services/tag.serviece.ts) | TypeScript | 29 | 3 | 4 | 36 |
| [src/modules/task/task.module.ts](/src/modules/task/task.module.ts) | TypeScript | 3 | 1 | 1 | 5 |
| [src/modules/user/controllers/auth.controller.ts](/src/modules/user/controllers/auth.controller.ts) | TypeScript | 5 | 4 | 3 | 12 |
| [src/modules/user/controllers/user.controller.ts](/src/modules/user/controllers/user.controller.ts) | TypeScript | -5 | 5 | 0 | 0 |
| [src/modules/user/dto/oraganization/update-organization.dto.ts](/src/modules/user/dto/oraganization/update-organization.dto.ts) | TypeScript | -4 | 4 | 0 | 0 |
| [src/modules/user/dto/permission/create-permission.dto.ts](/src/modules/user/dto/permission/create-permission.dto.ts) | TypeScript | -10 | 10 | 0 | 0 |
| [src/modules/user/entities/interfaces/permission.interface.ts](/src/modules/user/entities/interfaces/permission.interface.ts) | TypeScript | 4 | 0 | 0 | 4 |
| [src/modules/user/entities/interfaces/role.interface.ts](/src/modules/user/entities/interfaces/role.interface.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [src/modules/user/entities/interfaces/user-role.interface.ts](/src/modules/user/entities/interfaces/user-role.interface.ts) | TypeScript | 4 | 0 | 1 | 5 |
| [src/modules/user/entities/permission.entity.ts](/src/modules/user/entities/permission.entity.ts) | TypeScript | 12 | 0 | 0 | 12 |
| [src/modules/user/entities/role.entity.ts](/src/modules/user/entities/role.entity.ts) | TypeScript | 1 | -1 | 0 | 0 |
| [src/modules/user/entities/user-role.entity.ts](/src/modules/user/entities/user-role.entity.ts) | TypeScript | 9 | 2 | 3 | 14 |
| [src/modules/user/repositories/auth-manage.repository.ts](/src/modules/user/repositories/auth-manage.repository.ts) | TypeScript | 6 | 1 | 1 | 8 |
| [src/modules/user/repositories/interfaces/auth-manage.repository.interface.ts](/src/modules/user/repositories/interfaces/auth-manage.repository.interface.ts) | TypeScript | 0 | -1 | 0 | -1 |
| [src/modules/user/repositories/interfaces/org-dep-manage.repository.interface.ts](/src/modules/user/repositories/interfaces/org-dep-manage.repository.interface.ts) | TypeScript | 22 | 63 | 25 | 110 |
| [src/modules/user/repositories/interfaces/organization-manage.repository.interface.ts](/src/modules/user/repositories/interfaces/organization-manage.repository.interface.ts) | TypeScript | -21 | -14 | -13 | -48 |
| [src/modules/user/repositories/interfaces/user-manage.repository.interface.ts](/src/modules/user/repositories/interfaces/user-manage.repository.interface.ts) | TypeScript | 0 | 1 | 2 | 3 |
| [src/modules/user/repositories/org-dep-manage.repository.ts](/src/modules/user/repositories/org-dep-manage.repository.ts) | TypeScript | 48 | 3 | 13 | 64 |
| [src/modules/user/repositories/user-manage.repository.ts](/src/modules/user/repositories/user-manage.repository.ts) | TypeScript | 3 | 20 | 1 | 24 |
| [src/modules/user/services/interface/auth-manage.interface.ts](/src/modules/user/services/interface/auth-manage.interface.ts) | TypeScript | 2 | 10 | 1 | 13 |
| [src/modules/user/services/interface/user-manager.interface.ts](/src/modules/user/services/interface/user-manager.interface.ts) | TypeScript | -1 | 1 | 0 | 0 |
| [src/modules/user/services/user/user-manage.service.ts](/src/modules/user/services/user/user-manage.service.ts) | TypeScript | -11 | -2 | -1 | -14 |
| [src/modules/user/user.module.ts](/src/modules/user/user.module.ts) | TypeScript | 6 | 0 | 1 | 7 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details