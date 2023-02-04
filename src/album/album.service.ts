import { TrackService } from './../track/track.service';
import { ArtistService } from './../artist/artist.service';
import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumStorage } from './interfaces/album-storage.interface';

@Injectable()
export class AlbumService {
  constructor(
    @Inject('AlbumStorage') private albumStorage: AlbumStorage,
    private artistService: ArtistService,
    private trackService: TrackService,
  ) { }

  create(createAlbumDto: CreateAlbumDto) {
    const { artistId } = createAlbumDto;

    if (artistId) {
      const artist = this.artistService.findOne(artistId);

      if (!artist) {
        throw new Error('Artist not found/BadRequest');
      }
    }

    return this.albumStorage.create(createAlbumDto);
  }

  findAll() {
    return this.albumStorage.findAll();
  }

  findOne(id: string) {
    return this.albumStorage.findOne(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const { artistId } = updateAlbumDto;

    if (artistId) {
      const artist = this.artistService.findOne(artistId);

      if (!artist) {
        console.log('ar=', artistId);
        throw new Error('Artist not found/BadRequest');
      }
    }

    return this.albumStorage.update(id, updateAlbumDto);
  }

  remove(id: string) {
    this.trackService.setNullToAlbumId(id);

    return this.albumStorage.delete(id);
  }
}
