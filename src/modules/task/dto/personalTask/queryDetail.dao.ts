import { ApiOperation, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"
import { ObjectId } from "typeorm"

export  class   QueryDetailDto{
    @ApiProperty({description:'获取任务详情的任务id'})
    @IsString()
    taskId!:string
    @ApiPropertyOptional({description:'任务携带的objectId'})
    @IsOptional()
    @IsString()
    taskObjectId?:string
}