import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Header,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @Header('content-type', 'application/json')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
}
