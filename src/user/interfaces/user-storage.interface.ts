import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface UserStorage {
  findAll: () => UserEntity[];
  findOne: (id: string) => UserEntity | undefined;
  deleteUser: (id: string) => boolean;
  update: (id: string, userForUpdate: UpdateUserDto) => UserEntity | undefined;
  create: (userData: CreateUserDto) => UserEntity;
}
