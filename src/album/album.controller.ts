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
  HttpStatus,
  HttpCode,
  Header,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) { }

  @Post()
  @Header('content-type', 'application/json')
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.create(createAlbumDto);
  }

  @Get()
  @Header('content-type', 'application/json')
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.albumService.findOne(id);

    if (album) {
      return album;
    }

    throw new NotFoundException();
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const updatedUser = await this.albumService.update(id, updateAlbumDto);
    if (updatedUser) {
      return updatedUser;
    }

    throw new NotFoundException();
  }

  @Delete(':id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const isDeleted = await this.albumService.remove(id);

    if (!isDeleted) {
      throw new NotFoundException();
    }
  }
}
