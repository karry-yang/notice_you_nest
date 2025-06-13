import { BadRequestException, Body, Controller, Delete, Get, Inject, Post, Query } from '@nestjs/common';
import { IFocusService } from '../services/interface/focus-service.interface';
import { IFocusServiceToken } from 'src/common/token/tokens';
import { CreateFocusDto } from '../dto/focus/create-focus.dto';
import { MyApiResponse } from 'src/common/dto/api-response.dto';
import { throwError } from 'rxjs';
import { error } from 'console';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CheckinCursor, decodeCursor, FocusCursor } from 'src/common/types/paginatedResult.interface';

@Controller('/focus')
export class FocusController {
  constructor(
    @Inject(IFocusServiceToken)
    private readonly focusServer: IFocusService
  ) {}
  //专注
  @Post('createFocus')
  async createFocus(@CurrentUser('userId') userId: string, @Body() dto: CreateFocusDto): Promise<MyApiResponse> {
   const data=  await this.focusServer.startFocus(userId,dto)
   return  MyApiResponse.success(data,'创建成功',210)
  }
  //获取habit专注记录  分页
  @Get('focusList')
  async  getFocusByHabitId(@Query('habitId') habitId:string ,@Query('nextCursor')nextCursor ?:string | null):Promise<MyApiResponse>{

  let cursorObj: FocusCursor | null = null;
      if (nextCursor && nextCursor !== null) {
        try {
          cursorObj = decodeCursor<FocusCursor>(nextCursor).payload;
        } catch (e) {
          console.error('Error parsing cursor:', e);
          throw new BadRequestException('Invalid cursor');
        }
      }
  //判断浮标存在性
  const data = await this.focusServer.getFocusesByHabitId(habitId, cursorObj);
     return  MyApiResponse.success(data,'创建成功',210)
  }
  //删除专注记录

  @Delete('delete')
  async  deleteFoucus(@Query('focusId')focusId:string,@CurrentUser('userId') userId:string):Promise<MyApiResponse>{
    const  data=  await  this.focusServer.deleteFocus(focusId)
    return MyApiResponse.success(focusId)
  }
}
