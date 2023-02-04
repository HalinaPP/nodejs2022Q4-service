import { UpdateUserDto } from './../dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';

export class InMemoryUserStorage {
  private users: UserEntity[] = [];

  constructor() { }

  findAll(): UserEntity[] {
    return this.users.map((user) => {
      delete user.password;
      return user;
    });
  }

  findOne(id: string): UserEntity | undefined {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      delete user.password;
    }
    return user;
  }

  deleteUser(id: string): boolean {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex < 0) {
      return false;
    }

    this.users.splice(userIndex, 1);

    return true;
  }

  update(id: string, userForUpdate: UpdateUserDto): UserEntity | undefined {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex < 0) {
      return undefined;
    }

    const user = this.users[userIndex];
    const now = new Date().getTime();
    const newVersion = user.version + 1;

    this.users[userIndex] = {
      ...user,
      password: userForUpdate.newPassword,
      version: newVersion,
      updatedAt: now,
    };

    return this.users[userIndex];
  }

  create(userData: CreateUserDto): UserEntity {
    const id = uuidv4();
    const { login, password } = userData;
    const now = new Date().getTime();

    const newUser: UserEntity = {
      id,
      login,
      password,
      version: 1,
      createdAt: now,
      updatedAt: now,
    };
    this.users.push(newUser);

    return newUser;
  }
}
