import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumStorage } from './interfaces/album-storage.interface';

@Injectable()
export class AlbumService {
  constructor(@Inject('AlbumStorage') private albumStorage: AlbumStorage) { }

  create(createAlbumDto: CreateAlbumDto) {
    return this.albumStorage.create(createAlbumDto);
  }

  findAll() {
    return this.albumStorage.findAll();
  }

  findOne(id: string) {
    return this.albumStorage.findOne(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.albumStorage.update(id, updateAlbumDto);
  }

  remove(id: string) {
    return this.albumStorage.delete(id);
  }
}
