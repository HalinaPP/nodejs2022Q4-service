import { TrackModule } from './../track/track.module';
import { AlbumModule } from './../album/album.module';
import { ArtistModule } from './../artist/artist.module';
import { forwardRef, Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { InMemoryFavoriteStorage } from './store/favorites.storage';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    {
      provide: 'FavoriteStorage',
      useClass: InMemoryFavoriteStorage,
    },
  ],
  exports: [FavoritesService],
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
  ],
})
export class FavoritesModule {}
