import { FavoritesModule } from './../favorites/favorites.module';
import { ArtistModule } from './../artist/artist.module';
import { TrackModule } from './../track/track.module';
import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { InMemoryAlbumStorage } from './store/album.storage';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      provide: 'AlbumStorage',
      useClass: InMemoryAlbumStorage,
    },
  ],
  exports: [AlbumService],
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => FavoritesModule),
  ],
})
export class AlbumModule {}
