import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {
  addTrack(id: string) {
    return 'This action adds a new favorite';
  }

  addAlbum(id: string) {
    return 'This action adds a new favorite';
  }

  addArtist(id: string) {
    return 'This action adds a new favorite';
  }

  findAll() {
    return `This action returns all favorites`;
  }

  removeTrack(id: string) {
    return `This action removes a #${id} favorite`;
  }

  removeAlbum(id: string) {
    return `This action removes a #${id} favorite`;
  }

  removeArtist(id: string) {
    return `This action removes a #${id} favorite`;
  }
}
