import { UserSetting } from "@user/entities/user-setting.entity";

 /**
     *@description 用户设置表 
    */
export interface SettingManageRepository{
    //按照用户id查询 settingId=userId

    findByid(id:string):Promise<UserSetting>
    //修改

     update(updateSeeting:Partial<UserSetting>):Promise<UserSetting | null>
   
}