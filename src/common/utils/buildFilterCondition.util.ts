import { PersonalTaskFilterDto } from "@task/dto/personalTask/psersonal-task-filter.dto";

export function buildFilterConditionWithParams(
  filter: PersonalTaskFilterDto,
  userId: string,
): { sql: string; params: any[] } {
  let filterCondition = `WHERE pt.created_by = ?`;
  const params: any[] = [userId];

  if (filter.startTime) {
    filterCondition += ` AND pt.task_start_time >= ?`;
    params.push(filter.startTime);
  }

  if (filter.endTime) {
    filterCondition += ` AND pt.task_end_time <= ?`;
    params.push(filter.endTime);
  }

  if (filter.taskPriority && filter.taskPriority.length > 0) {
    const placeholders = filter.taskPriority.map(() => '?').join(',');
    filterCondition += ` AND pt.task_priority IN (${placeholders})`;
    params.push(...filter.taskPriority);
  }

  if (filter.listiceId && filter.listiceId.length > 0) {
    const placeholders = filter.listiceId.map(() => '?').join(',');
    filterCondition += ` AND pt.listicle_id IN (${placeholders})`;
    params.push(...filter.listiceId);
  }

  if (filter.tagId && filter.tagId.length > 0) {
    const placeholders = filter.tagId.map(() => '?').join(',');
    filterCondition += ` AND pt.tag_id IN (${placeholders})`;
    params.push(...filter.tagId);
  }

  // if (filter.lastCheckinStatus && filter.lastCheckinStatus.length > 0) {
  //   const placeholders = filter.lastCheckinStatus.map(() => '?').join(',');
  //   filterCondition += ` AND pc2.checkin_status IN (${placeholders})`;
  //   params.push(...filter.lastCheckinStatus);
  // }

  // if (filter.nextCursor?.createdAt && filter.nextCursor?.taskId) {
  //   filterCondition += `
  //     AND (
  //       pt.created_at < ? OR 
  //       (pt.created_at = ? AND pt.task_id < ?)
  //     )
  //   `;
  //   params.push(filter.nextCursor.createdAt, filter.nextCursor.createdAt, filter.nextCursor.taskId);
  // }

  return { sql: filterCondition, params };
}
