export class RepositoryPersonalTaskDto {
  taskId!: string;
  taskTitle!: string;
  taskPriority!: number;
  taskParentId!: string;
  taskObjectId!: string;

  taskDescription!: string;
  taskStartTime!: Date;
  taskEndTime!: Date;
  hasFiles!: boolean;

  createdAt!: Date;
  updatedAt!: Date;
  createdBy!: string;
  updatedBy!: string;
  status!: number;

  //打卡规则数据
  ruleType!: number;
  days!: number;
  times!: number;
  intervalDays!: number;
  //清单id
  listicleId!: string;
  //标签id
  tagId?: string[];
  //可能存在分级
  leavel?: number;
}
