import { TaskCheckinType } from '@shared/enum/TaskCheckinType';
import { TaskTypeEnum } from '@shared/enum/TaskTypeEnum';
import { SimpleCheckinRuleDto } from '@task/dto/checkinRule/simple-checkin-rule.dto';
import { plainToInstance } from 'class-transformer';

export type RawCheckinRuleDto = Partial<{
  taskId: string;
  ruleType: number;
  days: any;
  times: any;
  intervalDays: number;
}>;

export function buildCheckinRuleDto(raw: RawCheckinRuleDto): SimpleCheckinRuleDto | null {
  if (raw.ruleType === undefined || raw.ruleType === null || !raw.taskId) return null;

  return plainToInstance(
    SimpleCheckinRuleDto,
    {
      taskType: TaskTypeEnum.PERSONAL,
      ruleType: raw.ruleType,
      days: Array.isArray(raw.days) ? raw.days : [],
      times: Array.isArray(raw.times) ? raw.times : [],
      intervalDays: raw.intervalDays ?? 0,
    },
    { excludeExtraneousValues: true }
  );
}
