/*import { FavoriteEntity } from '../entities/favorite.entity';

export class InMemoryFavoriteStorage {
  private favorites: FavoriteEntity = { artists: [], albums: [], tracks: [] };

  findAll(): FavoriteEntity {
    return this.favorites;
  }

  deleteAlbum(id: string): void {
    const idIndex = this.favorites.albums.findIndex(
      (albumId) => albumId === id,
    );

    if (idIndex > -1) {
      this.favorites.albums.splice(idIndex, 1);
    }
  }

  deleteArtist(id: string): void {
    const idIndex = this.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );

    if (idIndex > -1) {
      this.favorites.artists.splice(idIndex, 1);
    }
  }

  deleteTrack(id: string): void {
    const idIndex = this.favorites.tracks.findIndex(
      (trackId) => trackId === id,
    );

    if (idIndex > -1) {
      this.favorites.tracks.splice(idIndex, 1);
    }
  }

  addAlbum(id: string): void {
    const isIdExists = this.favorites.albums.includes(id);
    if (!isIdExists) {
      this.favorites.albums.push(id);
    }
  }

  addTrack(id: string): void {
    const isIdExists = this.favorites.tracks.includes(id);
    if (!isIdExists) {
      this.favorites.tracks.push(id);
    }
  }

  addArtist(id: string): void {
    const isIdExists = this.favorites.artists.includes(id);

    if (!isIdExists) {
      this.favorites.artists.push(id);
    }
  }
}
*/