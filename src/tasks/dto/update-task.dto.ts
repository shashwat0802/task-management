import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdateClassDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
