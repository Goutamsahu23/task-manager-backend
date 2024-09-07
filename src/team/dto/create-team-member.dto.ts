import { IsNotEmpty, IsArray } from 'class-validator';

export class CreateTeamMemberDto {
  @IsNotEmpty()
  name: string;

  @IsArray()
  members: number[];  
}
