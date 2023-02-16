import { TrackEntity } from './../../track/entities/track.entity';
import { AlbumEntity } from './../../album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.db-entity';

export interface FavoritesRepsonseEntity {
  artists: Artist[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}
