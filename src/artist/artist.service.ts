import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { AlbumService } from 'src/album/album.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TrackService } from './../track/track.service';
import { Artist } from './entities/artist.db-entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => FavoritesService))
    private favoriteService: FavoritesService,
  ) { }

  async create(createArtistDto: CreateArtistDto) {
    let newArtist = new Artist();
    newArtist = {
      ...newArtist,
      ...createArtistDto,
    };

    await this.artistRepository.save(newArtist);

    return newArtist;
  }

  findAll() {
    return this.artistRepository.find();
  }

  findOne(id: string) {
    return this.artistRepository.findOneBy({ id });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
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
    this.favoriteService.removeArtist(id);

    const deleteResult = await this.artistRepository.delete(id);
    const isDeleted = !!deleteResult.affected;

    return isDeleted;
  }
}
