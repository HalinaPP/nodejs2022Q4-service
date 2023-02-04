import { Module } from '@nestjs/common';
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
})
export class ArtistModule { }
