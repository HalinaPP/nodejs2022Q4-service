import { TrackEntity } from './../../track/entities/track.entity';
import { AlbumEntity } from './../../album/entities/album.entity';
import { ArtistEntity } from './../../artist/entities/artist.entity';

export interface FavoritesRepsonseEntity {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}
