import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackStorage } from './interfaces/track-storage.interface';

@Injectable()
export class TrackService {
  constructor(
    private artistService: ArtistService,
    @Inject('TrackStorage') private trackStorage: TrackStorage,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
  ) { }

  create(createTrackDto: CreateTrackDto) {
    const { artistId, albumId } = createTrackDto;

    if (artistId) {
      const artist = this.artistService.findOne(artistId);

      if (!artist) {
        throw new Error('Artist not found/BadRequest');
      }
    }

    if (albumId) {
      const album = this.albumService.findOne(albumId);

      if (!album) {
        throw new Error('Album not found/BadRequest');
      }
    }

    return this.trackStorage.create(createTrackDto);
  }

  findAll() {
    return this.trackStorage.findAll();
  }

  findOne(id: string) {
    return this.trackStorage.findOne(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const { artistId, albumId } = updateTrackDto;

    if (artistId) {
      const artist = this.artistService.findOne(artistId);

      if (!artist) {
        throw new Error('Artist not found/BadRequest');
      }
    }

    if (albumId) {
      const album = this.albumService.findOne(albumId);

      if (!album) {
        throw new Error('Album not found/BadRequest');
      }
    }

    return this.trackStorage.update(id, updateTrackDto);
  }

  remove(id: string) {
    return this.trackStorage.delete(id);
  }

  setNullToAlbumId(albumId: string) {
    return this.trackStorage.setNullToAlbumId(albumId);
  }

  setNullToArtistId(artistId: string) {
    return this.trackStorage.setNullToArtistId(artistId);
  }
}
