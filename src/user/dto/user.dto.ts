import { IsUUID } from 'class-validator';
import { IsAlphanumeric, IsString, Length, Min } from 'class-validator';

export class UserDto {
  @IsUUID(4)
  id: string; // uuid v4

  @IsAlphanumeric()
  @Length(1, 20)
  login: string;

  @IsString()
  @Min(5)
  password: string;

  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}
