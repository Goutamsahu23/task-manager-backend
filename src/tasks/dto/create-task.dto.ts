import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  dueDate: Date;

  @IsOptional()
  assigneeId?: number;

  @IsOptional()
  teamId?: number;

  @IsString()
  @IsOptional()
  status?: string;
}
