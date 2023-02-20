import { Favorite } from './entities/favorite.entity';
import {
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Track } from './../track/entities/track.entity';
import { TrackService } from './../track/track.service';
import { Album } from './../album/entities/album.entity';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { Artist } from '../artist/entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  async getFavs(): Promise<Partial<Favorite>> {
    const favorites = await this.favoriteRepository.find();

    if (favorites.length === 0) {
      return { artists: [], albums: [], tracks: [] };
    }

    return favorites[0];
  }

  async addEntityId(id: string, entityName: string) {
    const favs = await this.getFavs();

    const entities = favs[entityName];

    const entityIdIndex = entities.findIndex(
      (entityId: string) => entityId === id,
    );

    if (entityIdIndex < 0) {
      const updatedEntities = [...entities, id];

      const updatedFavs = {
        ...favs,
        [entityName]: updatedEntities,
      };

      await this.favoriteRepository.save(updatedFavs);
    }
  }

  async deleteEntityId(id: string, entityName: string) {
    const favs = await this.getFavs();
    const entities = favs[entityName];

    const idIndex = entities.findIndex((entityId: string) => entityId === id);

    if (idIndex > -1) {
      entities.splice(idIndex, 1);
      favs[entityName] = [...entities];

      await this.favoriteRepository.save(favs);
    }
  }

  async addTrack(id: string) {
    const track: Track = await this.trackService.findOne(id);

    if (!track) {
      throw new UnprocessableEntityException("Track doesn't exist");
    }

    await this.addEntityId(id, 'tracks');
  }

  async addAlbum(id: string) {
    const album: Album = await this.albumService.findOne(id);

    if (!album) {
      throw new UnprocessableEntityException("Album doesn't exist");
    }

    await this.addEntityId(id, 'albums');
  }

  async addArtist(id: string) {
    const artist: Artist = await this.artistService.findOne(id);

    if (!artist) {
      throw new UnprocessableEntityException("Artist doesn't exist");
    }

    await this.addEntityId(id, 'artists');
  }

  async findAll() {
    const favorites = await this.getFavs();

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

    const tracks: Track[] = await Promise.all(
      trackIds.map(async (trackId) => await this.trackService.findOne(trackId)),
    );

    return { artists, albums, tracks };
  }

  async removeTrack(id: string) {
    await this.deleteEntityId(id, 'tracks');
  }

  async removeAlbum(id: string) {
    await this.deleteEntityId(id, 'albums');
  }

  async removeArtist(id: string) {
    await this.deleteEntityId(id, 'artists');
  }
}
