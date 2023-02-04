import { TrackModule } from './../track/track.module';
import { ArtistModule } from './../artist/artist.module';
import { Module } from '@nestjs/common';
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
  imports: [ArtistModule, TrackModule],
})
export class AlbumModule { }
