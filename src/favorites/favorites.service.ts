import { TrackEntity } from './../track/entities/track.entity';
import { TrackService } from './../track/track.service';
import { AlbumEntity } from './../album/entities/album.entity';
import { AlbumService } from 'src/album/album.service';
import { ArtistEntity } from './../artist/entities/artist.entity';
import { FavoriteStorage } from './interfaces/favorites-storage.interface';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject('FavoriteStorage') private favoriteStorage: FavoriteStorage,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) { }

  addTrack(id: string) {
    const track: TrackEntity = this.trackService.findOne(id);

    if (!track) {
      throw new Error('Artist not found/422');
    }

    return this.favoriteStorage.addTrack(id);
  }

  addAlbum(id: string) {
    const album: AlbumEntity = this.albumService.findOne(id);

    if (!album) {
      throw new Error('album not found/422');
    }

    return this.favoriteStorage.addAlbum(id);
  }

  addArtist(id: string) {
    const artist: ArtistEntity = this.artistService.findOne(id);

    if (!artist) {
      throw new Error('album not found/422');
    }

    return this.favoriteStorage.addArtist(id);
  }

  findAll() {
    const favorites = this.favoriteStorage.findAll();

    const {
      artists: artistIds,
      albums: albumIds,
      tracks: trackIds,
    } = favorites;

    const artists: ArtistEntity[] = artistIds.map((artistId) =>
      this.artistService.findOne(artistId),
    );

    const albums: AlbumEntity[] = albumIds.map((albumId) =>
      this.albumService.findOne(albumId),
    );

    const tracks: TrackEntity[] = trackIds.map((trackId) =>
      this.trackService.findOne(trackId),
    );

    return { artists, albums, tracks };
  }

  removeTrack(id: string) {
    return this.favoriteStorage.deleteTrack(id);
  }

  removeAlbum(id: string) {
    return this.favoriteStorage.deleteAlbum(id);
  }

  removeArtist(id: string) {
    return this.favoriteStorage.deleteArtist(id);
  }
}
