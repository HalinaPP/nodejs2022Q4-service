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
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException, NotFoundException } from '@nestjs/common/exceptions';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user: UserDto = this.userService.findOne(id);
    if (user) {
      return user;
    }

    throw new NotFoundException();
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = this.userService.update(id, updateUserDto);
    if (updatedUser) {
      return updatedUser;
    }

    throw new NotFoundException();
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const isDeleted = this.userService.remove(id);
    if (!isDeleted) {
      throw new NotFoundException();
    }

    throw new HttpException('No content', HttpStatus.NO_CONTENT);
  }
}
