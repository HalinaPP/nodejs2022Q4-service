import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesModule } from './../favorites/favorites.module';
import { ArtistModule } from './../artist/artist.module';
import { TrackModule } from './../track/track.module';
import { Album } from 'src/album/entities/album.entity';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService, TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([Album]),
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => FavoritesModule),
  ],
})
export class AlbumModule { }
