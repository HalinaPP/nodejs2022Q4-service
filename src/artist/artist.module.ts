import { Artist } from './entities/artist.db-entity';
import { FavoritesModule } from './../favorites/favorites.module';
import { TrackModule } from './../track/track.module';
import { AlbumModule } from './../album/album.module';
import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [TypeOrmModule, ArtistService],
  imports: [
    TypeOrmModule.forFeature([Artist]),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    forwardRef(() => FavoritesModule),
  ],
})
export class ArtistModule { }
