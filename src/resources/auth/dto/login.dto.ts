import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(1, 20)
  login: string;

  @IsString()
  @Length(1, 20)
  password: string;
}
