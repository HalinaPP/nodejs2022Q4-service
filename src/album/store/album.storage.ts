import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';

export class InMemoryAlbumStorage {
  private albums: AlbumEntity[] = [];

  constructor() { }

  findAll(): AlbumEntity[] {
    return this.albums;
  }

  findOne(id: string): AlbumEntity | undefined {
    return this.albums.find((album) => album.id === id);
  }

  delete(id: string): boolean {
    const albumIndex = this.albums.findIndex((album) => album.id === id);

    if (albumIndex < 0) {
      return false;
    }

    this.albums.splice(albumIndex, 1);

    return true;
  }

  update(id: string, albumForUpdate: UpdateAlbumDto): AlbumEntity | undefined {
    const albumIndex = this.albums.findIndex((album) => album.id === id);

    if (albumIndex < 0) {
      return undefined;
    }

    this.albums[albumIndex] = {
      ...this.albums[albumIndex],
      ...albumForUpdate,
    };

    return this.albums[albumIndex];
  }

  create(albumData: CreateAlbumDto): AlbumEntity {
    const id = uuidv4();

    const newalbum: AlbumEntity = {
      id,
      ...albumData,
    };
    this.albums.push(newalbum);

    return newalbum;
  }
}
