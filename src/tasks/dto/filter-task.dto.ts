import { IsOptional } from 'class-validator';

export class FilterTaskDto {
  @IsOptional()
  status: string;

  @IsOptional()
  search: string;
}
