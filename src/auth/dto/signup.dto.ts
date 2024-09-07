import { IsString } from 'class-validator';

export class SignupDto {

  @IsString()
  name:string;
  
  @IsString()
  username: string;

  @IsString()
  password: string;
}
