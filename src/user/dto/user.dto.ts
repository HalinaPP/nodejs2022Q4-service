import { IsUUID } from 'class-validator';
import { IsAlphanumeric, IsString, Length, Min } from 'class-validator';

export class UserDto {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}
