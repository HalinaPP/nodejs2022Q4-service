import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesModule } from './../favorites/favorites.module';
import { AlbumModule } from './../album/album.module';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { ArtistModule } from '../artist/artist.module';
import { Track } from './entities/track.entity';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService, TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([Track]),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => FavoritesModule),
  ],
})
export class TrackModule {}
