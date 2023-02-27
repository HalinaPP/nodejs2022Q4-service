import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FavoritesService } from '../favorites/favorites.service';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => FavoritesService))
    private favoriteService: FavoritesService,
  ) {}

  async checkIfArtistExists(artistId: string) {
    if (artistId) {
      const artist = await this.artistService.findOne(artistId);

      if (!artist) {
        throw new Error('Artist not found/BadRequest');
      }
    }
  }

  async checkIfAlbumExists(albumId: string) {
    if (albumId) {
      const album = await this.albumService.findOne(albumId);

      if (!album) {
        throw new Error('Album not found/BadRequest');
      }
    }
  }

  async create(createTrackDto: CreateTrackDto) {
    const { artistId, albumId } = createTrackDto;

    await this.checkIfAlbumExists(albumId);
    await this.checkIfArtistExists(artistId);

    const createdTrack = await this.trackRepository.save(createTrackDto);

    return createdTrack;
  }

  findAll() {
    return this.trackRepository.find();
  }

  findOne(id: string) {
    return this.trackRepository.findOneBy({ id });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const { artistId, albumId } = updateTrackDto;

    await this.checkIfArtistExists(artistId);
    await this.checkIfAlbumExists(albumId);

    let updatedTrack = await this.findOne(id);

    if (!updatedTrack) {
      return undefined;
    }

    updatedTrack = { ...updatedTrack, ...updateTrackDto };
    await this.trackRepository.save(updatedTrack);

    return updatedTrack;
  }

  async remove(id: string) {
    await this.favoriteService.removeTrack(id);

    const deleteResult = await this.trackRepository.delete(id);
    const isDeleted = !!deleteResult.affected;

    return isDeleted;
  }
}
