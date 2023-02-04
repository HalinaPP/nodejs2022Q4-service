import { HttpStatus } from '@nestjs/common/enums';
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
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) { }

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const track = this.trackService.findOne(id);

    if (track) {
      return track;
    }

    throw new NotFoundException();
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, updateTrackDto);
  }

  // remove from favs tracks
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const isDeleted = this.trackService.remove(id);

    if (!isDeleted) {
      throw new NotFoundException();
    }

    throw new HttpException('No content', HttpStatus.NO_CONTENT);
  }
}
