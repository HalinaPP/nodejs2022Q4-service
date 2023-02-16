import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackStorage } from './interfaces/track-storage.interface';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject('TrackStorage') private trackStorage: TrackStorage,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => FavoritesService))
    private favoriteService: FavoritesService,
  ) { }

  async create(createTrackDto: CreateTrackDto) {
    const { artistId, albumId } = createTrackDto;

    if (artistId) {
      const artist = await this.artistService.findOne(artistId);

      if (!artist) {
        throw new Error('Artist not found/BadRequest');
      }
    }

    if (albumId) {
      const album = await this.albumService.findOne(albumId);

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

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const { artistId, albumId } = updateTrackDto;

    if (artistId) {
      const artist = await this.artistService.findOne(artistId);

      if (!artist) {
        throw new Error('Artist not found/BadRequest');
      }
    }

    if (albumId) {
      const album = await this.albumService.findOne(albumId);

      if (!album) {
        throw new Error('Album not found/BadRequest');
      }
    }

    return this.trackStorage.update(id, updateTrackDto);
  }

  remove(id: string) {
    this.favoriteService.removeTrack(id);

    return this.trackStorage.delete(id);
  }

  setNullToAlbumId(albumId: string) {
    return this.trackStorage.setNullToAlbumId(albumId);
  }

  setNullToArtistId(artistId: string) {
    return this.trackStorage.setNullToArtistId(artistId);
  }
}
