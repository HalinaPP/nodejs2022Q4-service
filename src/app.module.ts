import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './resources/user/user.module';
import { ArtistModule } from './resources/artist/artist.module';
import { TrackModule } from './resources/track/track.module';
import { AlbumModule } from './resources/album/album.module';
import { FavoritesModule } from './resources/favorites/favorites.module';
import { Favorite } from './resources/favorites/entities/favorite.entity';
import { User } from './resources/user/entities/user.entity';
import { Artist } from './resources/artist/entities/artist.entity';
import { Album } from './resources/album/entities/album.entity';
import { Track } from './resources/track/entities/track.entity';
import { LoggerMiddleware } from './logger/logger.middleware';
import { LoggingModule } from './logger/logging.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 5437,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'postgres',
      synchronize: true,
      logging: false,
      entities: [Album, Artist, Favorite, Track, User],
    }),
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
    LoggingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) { }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
