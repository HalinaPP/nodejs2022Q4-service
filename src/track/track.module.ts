import { FavoritesModule } from './../favorites/favorites.module';
import { AlbumModule } from './../album/album.module';
import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { InMemoryTrackStorage } from './store/track.storage';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    {
      provide: 'TrackStorage',
      useClass: InMemoryTrackStorage,
    },
  ],
  exports: [TrackService],
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => FavoritesModule),
  ],
})
export class TrackModule { }
