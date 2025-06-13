import { Controller, Inject } from "@nestjs/common";
import { IPersonalTaskCheckinServiceToken } from "src/common/token/tokens";
import { IPersonalTaskCheckinRespository } from "../repositories/interfaces/personal-checkin.repository.interface";

@Controller('/personal-checkin')
export  class PersonalTaskCheckinController {

    constructor(
        @Inject(IPersonalTaskCheckinServiceToken)
        private  readonly PersonalTaskCheckinService:IPersonalTaskCheckinRespository
    ){}
}