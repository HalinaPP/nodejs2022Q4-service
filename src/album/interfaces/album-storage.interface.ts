import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';

export interface AlbumStorage {
  findAll: () => AlbumEntity[];
  findOne: (id: string) => AlbumEntity | undefined;
  delete: (id: string) => boolean;
  update: (
    id: string,
    albumForUpdate: UpdateAlbumDto,
  ) => AlbumEntity | undefined;
  create: (userData: CreateAlbumDto) => AlbumEntity;
}
