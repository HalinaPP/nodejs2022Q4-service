import { IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(5, 20)
  oldPassword: string; // previous password

  @IsString()
  @Length(5, 20)
  newPassword: string; // new password
}
