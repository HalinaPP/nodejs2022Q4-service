import { TrackModule } from './../track/track.module';
import { AlbumModule } from './../album/album.module';
import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { InMemoryArtistStorage } from './store/artist.storage';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    {
      provide: 'ArtistStorage',
      useClass: InMemoryArtistStorage,
    },
  ],
  exports: [ArtistService],
  imports: [forwardRef(() => AlbumModule), forwardRef(() => TrackModule)],
})
export class ArtistModule { }
