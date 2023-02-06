import { IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(1, 20)
  oldPassword: string; // previous password

  @IsString()
  @Length(1, 20)
  newPassword: string; // new password
}
