import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistStorage } from './interfaces/artist-storage.interface';
import { AlbumService } from 'src/album/album.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TrackService } from './../track/track.service';
import { Artist } from './entities/artist.db-entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @Inject('ArtistStorage') private artistStorage: ArtistStorage,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => FavoritesService))
    private favoriteService: FavoritesService,
  ) { }

  async create(createArtistDto: CreateArtistDto) {
    //return this.artistStorage.create(createArtistDto);
    let newArtist = new Artist();
    newArtist = {
      ...newArtist,
      ...createArtistDto,
    };

    await this.artistRepository.save(newArtist);

    return newArtist;
  }

  findAll() {
    // return this.artistStorage.findAll();
    return this.artistRepository.find();
  }

  findOne(id: string) {
    //return this.artistStorage.findOne(id);
    return this.artistRepository.findOneBy({ id });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    //return this.artistStorage.update(id, updateArtistDto);
    let updatedArtist = await this.findOne(id);

    if (!updatedArtist) {
      return undefined;
    }

    updatedArtist = { ...updatedArtist, ...updateArtistDto };

    await this.artistRepository.save(updatedArtist);

    return updatedArtist;
  }

  async remove(id: string) {
    this.trackService.setNullToArtistId(id);
    this.albumService.setNullToArtistId(id);
    this.favoriteService.removeArtist(id);

    // return this.artistStorage.delete(id);
    return await this.artistRepository.delete(id);
  }
}
