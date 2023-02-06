import { FavoritesService } from './../favorites/favorites.service';
import { TrackService } from './../track/track.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumStorage } from './interfaces/album-storage.interface';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class AlbumService {
  constructor(
    @Inject('AlbumStorage') private albumStorage: AlbumStorage,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private favoriteService: FavoritesService,
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
        throw new Error('Artist not found/BadRequest');
      }
    }

    return this.albumStorage.update(id, updateAlbumDto);
  }

  remove(id: string) {
    this.trackService.setNullToAlbumId(id);
    this.favoriteService.removeAlbum(id);

    return this.albumStorage.delete(id);
  }

  setNullToArtistId(artistId: string) {
    return this.albumStorage.setNullToArtistId(artistId);
  }
}
