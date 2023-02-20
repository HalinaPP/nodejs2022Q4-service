import { TrackService } from './../track/track.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistStorage } from './interfaces/artist-storage.interface';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class ArtistService {
  constructor(
    @Inject('ArtistStorage') private artistStorage: ArtistStorage,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => FavoritesService))
    private favoriteService: FavoritesService,
  ) {}

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
    this.trackService.setNullToArtistId(id);
    this.albumService.setNullToArtistId(id);
    this.favoriteService.removeArtist(id);

    return this.artistStorage.delete(id);
  }
}
