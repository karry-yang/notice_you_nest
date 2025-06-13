import { ApiProperty } from '@nestjs/swagger';
import { PriorityEnum } from '@shared/enum/PriorityEnum';
import { Expose, Transform } from 'class-transformer';
import { SimpleTag } from '../tag/simple-tag.dto';
import { Tag } from '@task/entities/tag.entity';

/**
 * @description 简单的perosntask Dto类  包含personaltask的基本常用数据,还有携带licticle&tag的id+title  可选择数据 按照与顶级父任务的级数
 */
export class BasePersonalTaskSummaryDto {
  @ApiProperty({ description: '任务id' })
  @Expose({ name: 'task_id' })
  taskId!: string;

  @ApiProperty({ description: '任务标题' })
  @Expose({ name: 'task_title' })
  taskTitle!: string;
  //父级id
  @ApiProperty({ description: '任务父级id' })
  @Expose({ name: 'task_parent_id' })
  taskParentId!: string;
  //任务优先级
  @ApiProperty({ description: '任务优先级' })
  @Expose({ name: 'task_priority' })
  taskPriority!: PriorityEnum;

  //最新打卡时间
  @ApiProperty({ description: '上次打卡时间 只有在前端获取摘要信息的时候 需要' })
  @Expose({ name: 'last_checkin_time' })
  lastCheckinTime?: Date;

  //任务结束时间
  @ApiProperty({ description: '任务结束时间' })
  @Expose({ name: 'task_end_time' })
  taskEndTime!: Date;
  //任务开启时间
  @ApiProperty({ description: '任务开启时间' })
  @Expose({ name: 'task_start_time' })
  taskStartTime!: Date;

  //清单id
  @ApiProperty({ description: '清单id' })
  @Expose({ name: 'tasklisticle_id' })
  taskListicleId!: string;
  // 清单标题
  @ApiProperty({ description: '清单标题' })
  @Expose({ name: 'listicle_title' })
  licticleTitle!: string;
  // 标签id
  @ApiProperty({ description: '任务包含的标签简单对象数组  因为标签和任务是多对多关系' })
  @Transform(({ value }) => {
    return (
      value?.map?.((t: Tag) => ({
        tagId: t.tagId,
        tagTitle: t.tagTitle,
        tagColor: t.tagColor,
      })) ?? []
    );
  })
  tags!: SimpleTag[];
    //创建时间
  @ApiProperty({ description: '创建时间' })
  @Expose({ name: 'created_at' })
  createdAt!: Date;
  //完成状态
  @ApiProperty({ description: '最近的打卡状态' })
  @Expose({ name: 'last_checkin_status' })
  lastCheckInStatus!: number;

  @ApiProperty({ description: '级别可选属性' })
  @Expose({ name: 'leavel' })
  leavel?: number;

}
