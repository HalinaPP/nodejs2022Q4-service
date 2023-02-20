import { Track } from '../../track/entities/track.entity';
import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';

export interface FavoritesRepsonseEntity {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
