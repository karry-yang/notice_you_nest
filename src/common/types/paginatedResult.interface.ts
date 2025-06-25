/**
 * @description 分页查询惨呼
 * @param nextCousor{string | null} 游标  
 * @param hasNextPage {bolean}  是否有下一页 
*/
export interface PaginatedResult<T> {
  data: T[]; // 当前页的数据
  nextCursor: string | null; // 下一页的游标（ID或时间戳等），用于获取更多数据
  hasNextPage: boolean; // 是否还有下一页数据（用于"加载更多"）
}

/**
 * @description  任务分页查游标
@param createdAt:上次查询最后一条记录 创建时间
@param taskId:上次查询最后一条记录 任务id
*/
export interface TaskCursor {
  createdAt: string | null;
  taskId: string | null;
}
export interface TaskUpdatedCursor {
  updatedAt: string | null;
  taskId: string | null;
}
export interface TaskLevelCursor {
  level: number
  createdAt: string | null;
  taskId: string | null;
}

/**
 * @description  公开任务大打卡数据数据分页查询游标
@param：checkinTime 上次查询最后一条记录打卡时间
@param assingeeId  上次查询最后一条记录指派人id
*/
export interface CheckinCursor {
  checkinTime: string | null;
  assingeeId: string | null;
}

export interface FocusCursor{
  focusId:string;
  createdAt:string
}

/**
 * @description  公开任务大打卡数据数据分页查询游标
@param：createdAt 上次查询最后一条用户记录的创建时间
@param  userId  上次查询最后一条记录的用户id
*/
export interface UserCursor {
  createdAt: string;
  userId: string;
}

/**
 * @description 接收者分页查询游标
 * @param createdAt 上次查询最后一条记录的接收表id
 * @param  createAt 上次查询最后一条记录最后一条记录的创建时间
 */
export interface AssigneeCursor {
  assingeeId: string;
  createdAt: string;
}

  export type CursorTypes = TaskCursor |TaskLevelCursor|TaskUpdatedCursor| CheckinCursor | FocusCursor | UserCursor | AssigneeCursor;

  //
export function encodeCursor<T extends CursorTypes>(cursor: T, type: string): string {
  const raw = JSON.stringify({ type, payload: cursor });
  return Buffer.from(raw).toString('base64');
}

//解码
export function decodeCursor<T extends CursorTypes>(encoded: string): { type: string; payload: T } {
  const raw = Buffer.from(encoded, 'base64').toString('utf-8');
  return JSON.parse(raw);
}

