import { UserDto } from './dto/user.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ParseUUIDPipe } from '@nestjs/common/pipes';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user: UserDto = await this.userService.findOne(id);
    if (user) {
      return user;
    }

    throw new NotFoundException();
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.update(id, updateUserDto);

    if (updatedUser) {
      return updatedUser;
    }

    throw new NotFoundException();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const isDeleted = await this.userService.remove(id);
    if (!isDeleted) {
      throw new NotFoundException();
    }
  }
}
