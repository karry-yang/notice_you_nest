import { Inject, Injectable } from "@nestjs/common";
import { CreatePersonalTaskDto } from "@task/dto/personalTask/create-personal-task.dto";
import { UpdatePersonalTaskDto } from "@task/dto/personalTask/update-personal-task.dto";
import { PersonalTask } from "@task/entities/personal-task.entity";
import { PersonalTaskRepository } from "@task/repositories/personal-task.repository";
import { IPersonalTaskService } from "@task/services/interface/personal-task-server.interface";
import { IPersonalTaskCheckinRepositoryToken } from "src/common/token/tokens";
import { PaginatedResult } from "src/common/types/paginatedResult.interface";
import { DataSource } from "typeorm";
import { IPersoanCheckinService } from "./interface/personal-checkin-service.interface";

@Injectable()
export class  PersonalCheckinService  implements IPersoanCheckinService{

    constructor(
        @Inject(IPersonalTaskCheckinRepositoryToken)
        private   readonly personTaskCheckRep:PersonalTaskRepository,
        private readonly dataSource:DataSource
    ){}
   
     //打卡
    //查看打卡日志
    //查看打卡信息
}