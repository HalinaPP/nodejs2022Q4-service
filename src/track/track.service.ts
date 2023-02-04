import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackStorage } from './interfaces/track-storage.interface';

@Injectable()
export class TrackService {
  constructor(@Inject('TrackStorage') private trackStorage: TrackStorage) { }

  create(createTrackDto: CreateTrackDto) {
    return this.trackStorage.create(createTrackDto);
  }

  findAll() {
    return this.trackStorage.findAll();
  }

  findOne(id: string) {
    return this.trackStorage.findOne(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.trackStorage.update(id, updateTrackDto);
  }

  remove(id: string) {
    return this.trackStorage.delete(id);
  }
}
