import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import {
  convertUserDateToNumber,
  convertUsersDateToNumber,
  deleteUsersPassword,
} from '../../utils/helpers';
import { hashPassword, isPasswordMatch } from './hash-password';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { login, password } = createUserDto;
    let newUser = new User();

    const hashedPassword = await hashPassword(password);

    newUser = {
      ...newUser,
      login: login,
      password: hashedPassword,
    };

    const createdUser = await this.userRepository.save(newUser);

    delete createdUser.password;

    return convertUserDateToNumber(createdUser);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find();
    const convertedUsers = convertUsersDateToNumber(users);
    return deleteUsersPassword(convertedUsers);
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ id });

    if (user) {
      delete user.password;
      return convertUserDateToNumber(user);
    }

    return null;
  }

  async findOneByLogin(login: string): Promise<User> {
    return await this.userRepository.findOneBy({ login });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    let updatedUser = await this.userRepository.findOneBy({ id });

    if (!updatedUser) {
      throw new NotFoundException();
    }

    const { oldPassword, newPassword } = updateUserDto;

    const isMatch = await isPasswordMatch(oldPassword, updatedUser.password);

    if (!isMatch) {
      throw new ForbiddenException();
    }

    const hashedNewPassword = await hashPassword(newPassword);

    const newVersion = updatedUser.version + 1;

    updatedUser = {
      ...updatedUser,
      password: hashedNewPassword,
      version: newVersion,
    };

    await this.userRepository.save(updatedUser);

    delete updatedUser.password;

    return convertUserDateToNumber(updatedUser);
  }

  async remove(id: string): Promise<boolean> {
    const deleteResult = await this.userRepository.delete(id);
    return !!deleteResult.affected;
  }
}
