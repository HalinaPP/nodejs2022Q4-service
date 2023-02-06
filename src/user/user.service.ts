import { UserEntity } from './entities/user.entity';
import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
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
    const user = this.userStorage.findOneWithPassword(id);

    if (!user) {
      throw new NotFoundException();
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException();
    }

    const updatedUser = this.userStorage.update(id, updateUserDto);

    return updatedUser;
  }

  remove(id: string): boolean {
    return this.userStorage.deleteUser(id);
  }
}
