import { Controller, Inject, UseGuards } from "@nestjs/common";
import { IAuthManageService } from "@user/services/interface/auth-manage.interface";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { IAuthManageServiceToken } from "src/common/token/tokens";

//各种级别的管理员使用的路由  用于权限关联
@Controller('auth')
export class AuthController {
    constructor(
        @Inject(IAuthManageServiceToken)
        private readonly authService:IAuthManageService
    ){}


    //获取组织中的管理员信息
    // @UseGuards(JwtAuthGuard,RolesGuard)
    // async getAllAdmins(){

    // }
}