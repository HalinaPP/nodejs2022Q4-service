import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Auth } from './entities/auth.entity';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserDto } from '../user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { Token, TokensDto } from './dto/tokens.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async signup(createUserDTO: CreateUserDto): Promise<UserDto> {
    const newUser = await this.userService.create(createUserDTO);
    if (!newUser) {
      throw new BadRequestException();
    }

    return newUser;
  }

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByLogin(login);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserDto): Promise<TokensDto> {
    const { id, login } = user;

    const payload: Token = { login, userId: id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
