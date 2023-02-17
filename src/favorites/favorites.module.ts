import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackModule } from './../track/track.module';
import { AlbumModule } from './../album/album.module';
import { ArtistModule } from './../artist/artist.module';
import { forwardRef, Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { Favorite } from './entities/favorite.entity';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [TypeOrmModule, FavoritesService],
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
  ],
})
export class FavoritesModule { }
