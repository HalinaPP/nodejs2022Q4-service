import { UserEntity } from './entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStorage } from './interfaces/user-storage.interface';

@Injectable()
export class UserService {
  constructor(@Inject('UserStorage') private userStorage: UserStorage) { }

  create(createUserDto: CreateUserDto): UserEntity {
    return this.userStorage.create(createUserDto);
  }

  findAll(): UserEntity[] {
    return this.userStorage.findAll();
  }

  findOne(id: string): UserEntity | undefined {
    return this.userStorage.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto): UserEntity {
    const user = this.findOne(id);

    if (!user) {
      throw new Error('not exists');
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new Error('403');
    }

    const updatedUser = this.userStorage.update(id, updateUserDto);

    return updatedUser;
  }

  //add removing from favs
  remove(id: string): boolean {
    return this.userStorage.deleteUser(id);
  }
}
