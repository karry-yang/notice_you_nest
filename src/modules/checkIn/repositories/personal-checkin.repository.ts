import { InjectRepository } from "@nestjs/typeorm";
import { IPersonalCheckin } from "../entities/interfaces/personal-checkin.interface";
import { PersonalCheckin } from "../entities/personal-checkin.entity";
import { DataSource, Repository } from "typeorm";
import { IPersonalTaskCheckinRespository } from "./interfaces/personal-checkin.repository.interface";
import { PaginatedResult } from "src/common/types/paginatedResult.interface";
import { CreatePersonalCheckinDto } from "../dto/personal-checkin/create-personal-checkin.dto";

export class PersonaCheckinRespository implements IPersonalTaskCheckinRespository{
    constructor(
        @InjectRepository(PersonalCheckin)
        private readonly personalCheckinRepo: Repository<PersonalCheckin>,
        private readonly dataSource: DataSource // ✅ 注入 DataSource
    ) {}
    findById(id: string): Promise<PersonalCheckin | null> {
        throw new Error("Method not implemented.");
    }
    findByUserId(userId: string, currentPage: number, pageSize: number): Promise<PaginatedResult<PersonalCheckin>> {
        throw new Error("Method not implemented.");
    }
    findByTaskId(taskId: string, currentPage: number, pageSize: number): Promise<PaginatedResult<PersonalCheckin>> {
        throw new Error("Method not implemented.");
    }
    createPersonalCheckin(createPersonalCheckin: CreatePersonalCheckinDto): Promise<PersonalCheckin | null> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}