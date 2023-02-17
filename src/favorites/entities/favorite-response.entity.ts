import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

export interface FavoritesRepsonseEntity {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
