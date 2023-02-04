import { Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistStorage } from './interfaces/artist-storage.interface';

@Injectable()
export class ArtistService {
  constructor(@Inject('ArtistStorage') private artistStorage: ArtistStorage) { }

  create(createArtistDto: CreateArtistDto) {
    return this.artistStorage.create(createArtistDto);
  }

  findAll() {
    return this.artistStorage.findAll();
  }

  findOne(id: string) {
    return this.artistStorage.findOne(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistStorage.update(id, updateArtistDto);
  }

  remove(id: string) {
    return this.artistStorage.delete(id);
  }
}
