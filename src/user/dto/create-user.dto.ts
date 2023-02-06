import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 20)
  login: string;

  @IsString()
  @Length(5, 20)
  password: string;
}
