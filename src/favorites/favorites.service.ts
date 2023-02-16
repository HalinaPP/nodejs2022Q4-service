import { TrackEntity } from './../track/entities/track.entity';
import { TrackService } from './../track/track.service';
import { Album } from './../album/entities/album.entity';
import { AlbumService } from 'src/album/album.service';
import { FavoriteStorage } from './interfaces/favorites-storage.interface';
import {
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';
import { Artist } from 'src/artist/entities/artist.db-entity';

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
      throw new UnprocessableEntityException("Track doesn't exist");
    }

    return this.favoriteStorage.addTrack(id);
  }

  async addAlbum(id: string) {
    const album: Album = await this.albumService.findOne(id);

    if (!album) {
      throw new UnprocessableEntityException("Album doesn't exist");
    }

    return this.favoriteStorage.addAlbum(id);
  }

  async addArtist(id: string) {
    const artist: Artist = await this.artistService.findOne(id);

    if (!artist) {
      throw new UnprocessableEntityException("Artist doesn't exist");
    }

    return this.favoriteStorage.addArtist(id);
  }

  async findAll() {
    const favorites = this.favoriteStorage.findAll();

    const {
      artists: artistIds,
      albums: albumIds,
      tracks: trackIds,
    } = favorites;

    const artists: Artist[] = await Promise.all(
      artistIds.map(
        async (artistId) => await this.artistService.findOne(artistId),
      ),
    );

    const albums: Album[] = await Promise.all(
      albumIds.map(async (albumId) => await this.albumService.findOne(albumId)),
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
