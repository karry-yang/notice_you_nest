//用户
export const IUserManageRepositoryToken = Symbol('IUserManageRepository');
export const IUserManageServiceToken = Symbol('IUserManageService');

//权限
export const IAuthManageRepositoryToken = Symbol('IAuthManageRepository');
export const IAuthManageServiceToken = Symbol('IAuthManageService');
//组织部门
export const IOrgDepManageRepositoryToken = Symbol('IOrgDepManageRepository');
export const IOrgDepManageServiceToken = Symbol('IOrgDepManageService');

//习惯
export const IHabitTaskRepositoryToken = Symbol('IHabitTaskRepository');
export const IHabitTaskServiceToken = Symbol('IHabitTaskService');

//习惯分组
export const IHabitGroupRepositoryToken = Symbol('IHabitGroupRepository');

//标签
export const ITagRepositoryToken = Symbol('ITagRepository');
export const ITagServiceToken = Symbol('ITagService');

//清单

export const IListicleRepositoryToken = Symbol('IListicleRepository');
export const IListicleServiceToken = Symbol('IListicleService');

//个人任务
export const IPersonalTaskRepositoryToken = Symbol('IPersonalTaskRepository');
export const IPersonalTaskServiceToken = Symbol('IPersonalTaskService');

//公开任务

export const IPublicTaskRepositoryToken=Symbol('IPublicTaskRepository')
export const IPublicTaskServiceToken = Symbol('IPublicTaskService');


//公开任务打卡
export const IPublicTaskCheckinRepositoryToken=Symbol('IPublicCheckinRepository')
export const IPublicTaskCheckinServiceToken = Symbol('IPublicCheckinService');


//私有任务打卡
export const IPersonalTaskCheckinRepositoryToken=Symbol('IPersonalCheckinRepository')
export const IPersonalTaskCheckinServiceToken = Symbol('IPersonalCheckinService');

//习惯任务专注
export const IFocusServiceToken=Symbol('IFocusService')
export const IFocusRepositoryToken=Symbol('IFocusRepository')

//打卡规则

export const ICheckinRuleRepositoryToken=Symbol('ICheckinRuleRepository')
