import { ApiProperty } from '@nestjs/swagger';
import { AssigneeCursor, CheckinCursor, FocusCursor, PaginatedResult, TaskCursor, TaskUpdatedCursor } from '../types/paginatedResult.interface';
import { any } from 'async';

export class PaginatedResultDto implements PaginatedResult<any> {
  @ApiProperty({ description: '当前页数据', type: any })
  data!: any[];
  @ApiProperty()
  
  nextCursor!: string | null;
  @ApiProperty()
  hasNextPage!: boolean;
}

export class TaskCursorDto implements TaskCursor {
  @ApiProperty()
  createdAt!: string | null;
  @ApiProperty()
  taskId!: string | null;
}
export class TaskUpdatedCursorDto implements TaskUpdatedCursor {
  @ApiProperty()
  updatedAt!: string | null;
  @ApiProperty()
  taskId!: string | null;
}
export class TaskLevelCursorDto implements TaskCursor {
  @ApiProperty({description:'所在的层级'})
  level!:number
  @ApiProperty()
  createdAt!: string | null;
  @ApiProperty()
  taskId!: string | null;

}

export class CheckinCursorDto implements CheckinCursor {
  @ApiProperty()
  checkinTime!: string | null;
  @ApiProperty()
  assingeeId!: string | null;
}
export class FocusCursorDto implements FocusCursor {
  @ApiProperty()
  focusId!: string;
  @ApiProperty()
  createdAt!: string;
}
export class AssigneeCursorDto implements AssigneeCursor {
  @ApiProperty()
  assingeeId!: string;

  @ApiProperty()
  createdAt!: string;
}

export class UserCursor implements UserCursor {
  @ApiProperty()
  createdAt!: string;
  @ApiProperty()
  userId!: string;
}
