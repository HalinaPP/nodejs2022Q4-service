import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';

export interface ArtistStorage {
  findAll: () => ArtistEntity[];
  findOne: (id: string) => ArtistEntity | undefined;
  delete: (id: string) => boolean;
  update: (
    id: string,
    artistForUpdate: UpdateArtistDto,
  ) => ArtistEntity | undefined;
  create: (userData: CreateArtistDto) => ArtistEntity;
}
