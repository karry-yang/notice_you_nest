import { CreateCheckInRuleDto } from "@task/dto/checkinRule/create-checkin-rule.dto";

export  interface  ICheckinRuleRepository{
    //查找
    findCheckinRule(userId:string,ruleId:string):Promise<any>
    //创建新的打卡规则 taskId:string, 就是ruleId

    createCheckinRule(userId:string, taskId:string,dto:CreateCheckInRuleDto):Promise<any>
    //删除旧的打卡规则
    deleteCheckinRule(userId:string,ruleId:string):Promise<boolean>
}