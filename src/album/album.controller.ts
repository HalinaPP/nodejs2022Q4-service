import { ParseUUIDPipe } from '@nestjs/common/pipes';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.albumService.findOne(id);

    if (album) {
      return album;
    }

    throw new NotFoundException();
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const updatedUser = this.albumService.update(id, updateAlbumDto);
    if (updatedUser) {
      return updatedUser;
    }

    throw new NotFoundException();
  }

  // remove from favs albums
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const isDeleted = this.albumService.remove(id);

    if (!isDeleted) {
      throw new NotFoundException();
    }

    throw new HttpException('No content', HttpStatus.NO_CONTENT);
  }
}
