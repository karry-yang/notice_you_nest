# Diff Details

Date : 2025-06-12 15:55:58

Directory c:\\Users\\karry-yang\\Desktop\\NOTICEYOU-NEXTJS\\notice_you_service_node\\notice_you_service

Total : 49 files,  691 codes, 129 comments, 116 blanks, all 936 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [README.md](/README.md) | Markdown | 10 | 0 | 5 | 15 |
| [src/common/dto/paginatedResult.dto.ts](/src/common/dto/paginatedResult.dto.ts) | TypeScript | 14 | 0 | 2 | 16 |
| [src/common/shared/enum/RowStatusEnum.ts](/src/common/shared/enum/RowStatusEnum.ts) | TypeScript | 4 | 6 | 4 | 14 |
| [src/common/shared/enum/StatusEnum.ts](/src/common/shared/enum/StatusEnum.ts) | TypeScript | -5 | -7 | -4 | -16 |
| [src/common/shared/enum/TaskCheckinStatusEnum.ts](/src/common/shared/enum/TaskCheckinStatusEnum.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [src/common/shared/enum/TaskCheckinType.ts](/src/common/shared/enum/TaskCheckinType.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [src/common/shared/enum/TaskStatusEnum.ts](/src/common/shared/enum/TaskStatusEnum.ts) | TypeScript | 5 | 7 | 4 | 16 |
| [src/common/types/paginatedResult.interface.ts](/src/common/types/paginatedResult.interface.ts) | TypeScript | 9 | 0 | 0 | 9 |
| [src/common/utils/buildFilterCondition.util.ts](/src/common/utils/buildFilterCondition.util.ts) | TypeScript | -9 | 9 | 0 | 0 |
| [src/main.ts](/src/main.ts) | TypeScript | 8 | 0 | -1 | 7 |
| [src/modules/task/controllers/personal-task.controller.ts](/src/modules/task/controllers/personal-task.controller.ts) | TypeScript | -11 | 0 | 1 | -10 |
| [src/modules/task/dto/checkinRule/create-checkin-rule.dto.ts](/src/modules/task/dto/checkinRule/create-checkin-rule.dto.ts) | TypeScript | 18 | 0 | 7 | 25 |
| [src/modules/task/dto/checkinRule/simple-checkin-rule.dto.ts](/src/modules/task/dto/checkinRule/simple-checkin-rule.dto.ts) | TypeScript | 27 | 0 | 6 | 33 |
| [src/modules/task/dto/listicle/base-listicle.dto.ts](/src/modules/task/dto/listicle/base-listicle.dto.ts) | TypeScript | 2 | 0 | 1 | 3 |
| [src/modules/task/dto/listicle/simple-listicle.dto.ts](/src/modules/task/dto/listicle/simple-listicle.dto.ts) | TypeScript | 13 | 0 | 4 | 17 |
| [src/modules/task/dto/personalTask/PersonalTaskSummary.dto.ts](/src/modules/task/dto/personalTask/PersonalTaskSummary.dto.ts) | TypeScript | -22 | -10 | -5 | -37 |
| [src/modules/task/dto/personalTask/base-personal-tasks-group.dto.ts](/src/modules/task/dto/personalTask/base-personal-tasks-group.dto.ts) | TypeScript | 12 | 8 | 2 | 22 |
| [src/modules/task/dto/personalTask/create-personal-task.dto.ts](/src/modules/task/dto/personalTask/create-personal-task.dto.ts) | TypeScript | 66 | 12 | 13 | 91 |
| [src/modules/task/dto/personalTask/createPersonalTask.dto.ts](/src/modules/task/dto/personalTask/createPersonalTask.dto.ts) | TypeScript | -34 | 0 | -13 | -47 |
| [src/modules/task/dto/personalTask/full-personal-task.dto.ts](/src/modules/task/dto/personalTask/full-personal-task.dto.ts) | TypeScript | 20 | 3 | 7 | 30 |
| [src/modules/task/dto/personalTask/personal-task-summary.dto.ts](/src/modules/task/dto/personalTask/personal-task-summary.dto.ts) | TypeScript | 54 | 13 | 8 | 75 |
| [src/modules/task/dto/personalTask/personal-task.dto.ts](/src/modules/task/dto/personalTask/personal-task.dto.ts) | TypeScript | 62 | 1 | 15 | 78 |
| [src/modules/task/dto/personalTask/personal-tasks-with-pagination.dto.ts](/src/modules/task/dto/personalTask/personal-tasks-with-pagination.dto.ts) | TypeScript | 17 | 3 | 5 | 25 |
| [src/modules/task/dto/personalTask/personalTaskWithPagination.responseDto.ts](/src/modules/task/dto/personalTask/personalTaskWithPagination.responseDto.ts) | TypeScript | -16 | 0 | -5 | -21 |
| [src/modules/task/dto/personalTask/personalTasksWithBaseListicleAndBaseTag.dto.ts](/src/modules/task/dto/personalTask/personalTasksWithBaseListicleAndBaseTag.dto.ts) | TypeScript | -10 | 0 | -2 | -12 |
| [src/modules/task/dto/personalTask/psersonal-task-filter.dto.ts](/src/modules/task/dto/personalTask/psersonal-task-filter.dto.ts) | TypeScript | 19 | 3 | 2 | 24 |
| [src/modules/task/dto/personalTask/update-personal-task.dto.ts](/src/modules/task/dto/personalTask/update-personal-task.dto.ts) | TypeScript | 18 | 5 | 7 | 30 |
| [src/modules/task/dto/personalTask/updatePersonalTask.dto.ts](/src/modules/task/dto/personalTask/updatePersonalTask.dto.ts) | TypeScript | -5 | 0 | -2 | -7 |
| [src/modules/task/dto/tag/base-tag.dto.ts](/src/modules/task/dto/tag/base-tag.dto.ts) | TypeScript | 37 | 0 | 9 | 46 |
| [src/modules/task/dto/tag/simple-tag.dto.ts](/src/modules/task/dto/tag/simple-tag.dto.ts) | TypeScript | 16 | 0 | 5 | 21 |
| [src/modules/task/entities/personal-task.entity.ts](/src/modules/task/entities/personal-task.entity.ts) | TypeScript | -4 | 0 | 2 | -2 |
| [src/modules/task/repositories/checkIn-rule.repository.ts](/src/modules/task/repositories/checkIn-rule.repository.ts) | TypeScript | 76 | 5 | 10 | 91 |
| [src/modules/task/repositories/habit-group.reposicory.ts](/src/modules/task/repositories/habit-group.reposicory.ts) | TypeScript | -31 | 0 | -3 | -34 |
| [src/modules/task/repositories/habit-group.repository.ts](/src/modules/task/repositories/habit-group.repository.ts) | TypeScript | 31 | 0 | 3 | 34 |
| [src/modules/task/repositories/interfaces/checkin-rule.repository.interface.ts](/src/modules/task/repositories/interfaces/checkin-rule.repository.interface.ts) | TypeScript | 6 | 3 | 2 | 11 |
| [src/modules/task/repositories/interfaces/personal-task.repository.interface.ts](/src/modules/task/repositories/interfaces/personal-task.repository.interface.ts) | TypeScript | 7 | 13 | 3 | 23 |
| [src/modules/task/repositories/personal-task.repository.ts](/src/modules/task/repositories/personal-task.repository.ts) | TypeScript | 262 | 16 | 18 | 296 |
| [src/modules/task/repositories/sql.ts](/src/modules/task/repositories/sql.ts) | TypeScript | 25 | 37 | 6 | 68 |
| [src/modules/task/services/interface/habit-task-server.interface.ts](/src/modules/task/services/interface/habit-task-server.interface.ts) | TypeScript | 17 | 25 | 15 | 57 |
| [src/modules/task/services/interface/habit-task.interface.ts](/src/modules/task/services/interface/habit-task.interface.ts) | TypeScript | -17 | -25 | -15 | -57 |
| [src/modules/task/services/interface/listicle-server.interface.ts](/src/modules/task/services/interface/listicle-server.interface.ts) | TypeScript | 10 | 5 | 2 | 17 |
| [src/modules/task/services/interface/listicle.interface.ts](/src/modules/task/services/interface/listicle.interface.ts) | TypeScript | -10 | -5 | -2 | -17 |
| [src/modules/task/services/interface/personal-task-server.interface.ts](/src/modules/task/services/interface/personal-task-server.interface.ts) | TypeScript | 18 | 56 | 5 | 79 |
| [src/modules/task/services/interface/personal-task.interface.ts](/src/modules/task/services/interface/personal-task.interface.ts) | TypeScript | -19 | -55 | -5 | -79 |
| [src/modules/task/services/interface/public-task-server.interface.ts](/src/modules/task/services/interface/public-task-server.interface.ts) | TypeScript | 17 | 47 | 13 | 77 |
| [src/modules/task/services/interface/public-task.interface.ts](/src/modules/task/services/interface/public-task.interface.ts) | TypeScript | -17 | -47 | -13 | -77 |
| [src/modules/task/services/interface/tag-server.interface.ts](/src/modules/task/services/interface/tag-server.interface.ts) | TypeScript | 9 | 12 | 6 | 27 |
| [src/modules/task/services/interface/tag.interface.ts](/src/modules/task/services/interface/tag.interface.ts) | TypeScript | -9 | -12 | -6 | -27 |
| [src/modules/task/services/personal-task.service.ts](/src/modules/task/services/personal-task.service.ts) | TypeScript | -1 | 1 | 0 | 0 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details