import { FavoriteEntity } from '../entities/favorite.entity';

export interface FavoriteStorage {
  findAll: () => FavoriteEntity;
  deleteTrack: (id: string) => boolean;
  addTrack: (id: string) => FavoriteEntity;
  deleteAlbum: (id: string) => boolean;
  addAlbum: (id: string) => FavoriteEntity;
  deleteArtist: (id: string) => boolean;
  addArtist: (id: string) => FavoriteEntity;
}
