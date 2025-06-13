export const attributesPersonalTask = `
  pt.task_id AS taskId,
  pt.task_title AS taskTitle,
  pt.task_priority AS taskPriority,
  pt.task_parent_id AS taskParentId,
  pt.task_object_id AS taskObjectId,
  pt.task_description AS taskDescription,
  pt.task_start_time AS taskStartTime,
  pt.task_end_time AS taskEndTime,
  pt.has_files AS hasFiles,
  pt.task_parent_id AS taskParentId,
  // pt.task_checkin_rule_id AS taskCheckinRuleId,
pt.listicle_id AS listicleId,

  cr.rule_type AS ruleType,
  cr.days AS days,
  cr.times AS  times,
  cr.interval_days AS intervalDays,

  pt.created_at AS createdAt,
  pt.updated_at AS updatedAt,
  pt.created_by AS createdBy,
  pt.updated_by AS updatedBy,
  pt.status AS status
`;

// export const attributesPersonalTaskHierarchy = `
//   pt.task_id AS taskId,
//   pt.task_title AS taskTitle,
//   pt.task_priority AS taskPriority,
//   pt.task_parent_id AS taskParentId,
//   pt.task_object_id AS taskObjectId,
//   pt.task_description AS taskDescription,
//   pt.task_start_time AS taskStartTime,
//   pt.task_end_time AS taskEndTime,
//   pt.has_files AS hasFiles,
//   pt.task_parentId AS taskParentIdAlt,
//   pt.task_checkin_rule_id AS taskCheckinRuleId,

//   cr.rule_type AS ruleType,
//   cr.days AS days,
//   cr.times AS  times,
//   cr.interval_days AS intervalDays,

//   pt.created_at AS createdAt,
//   pt.updated_at AS updatedAt,
//   pt.created_by AS createdBy,
//   pt.updated_by AS updatedBy,
//   pt.status AS status
// `;
// export const attributesListicle = `
//   l.listicle_id AS listicleId,
//   l.listile_icon AS  listicleIcon,
//   l.listicle_title AS listicelTitle,
//   l.listicle_type AS listicleType,
//   l.parent_id AS listicleParentId,

//  `;
// export const attributesTag = `
//    t.tag_id AS tagId,
//    t.tag_title AS tagTitle,
//    t.tag_color AS tagColor,
//    t.tag_description AS tagDescription,
//    t.parent_id AS tagParentId,

//  `;
// export const attributesLeavel = `pt.leavel AS level`;
