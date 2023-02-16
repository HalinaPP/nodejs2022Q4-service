import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistService } from 'src/artist/artist.service';
import { FavoritesService } from './../favorites/favorites.service';
import { TrackService } from './../track/track.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from 'src/album/entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private favoriteService: FavoritesService,
  ) { }

  async checkIfArtistExists(artistId) {
    if (artistId) {
      const artist = await this.artistService.findOne(artistId);

      if (!artist) {
        throw new Error('Artist not found/BadRequest');
      }
    }
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const { artistId } = createAlbumDto;

    await this.checkIfArtistExists(artistId);
    console.log('al=', createAlbumDto);
    const createdAlbum = await this.albumRepository.save(createAlbumDto);
    console.log('create=', createdAlbum);
    return createdAlbum;
  }

  findAll() {
    return this.albumRepository.find({
      relations: {
        artist: true,
      },
    });
  }

  findOne(id: string) {
    return this.albumRepository.findOneBy({ id });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const { artistId } = updateAlbumDto;

    await this.checkIfArtistExists(artistId);

    let updatedAlbum = await this.findOne(id);

    if (!updatedAlbum) {
      return undefined;
    }

    updatedAlbum = { ...updatedAlbum, ...updateAlbumDto };
    await this.albumRepository.save(updatedAlbum);

    return updatedAlbum;
  }

  async remove(id: string) {
    this.trackService.setNullToAlbumId(id);
    this.favoriteService.removeAlbum(id);

    const deleteResult = await this.albumRepository.delete(id);
    const isDeleted = !!deleteResult.affected;

    return isDeleted;
  }
}
