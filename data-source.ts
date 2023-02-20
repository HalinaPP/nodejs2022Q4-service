import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Album } from './src/album/entities/album.entity';
import { Artist } from './src/artist/entities/artist.entity';
import { User } from './src/user/entities/user.entity';
import { Favorite } from './src/favorites/entities/favorite.entity';
import { Track } from './src/track/entities/track.entity';
import * as dotenv from 'dotenv';
dotenv.config();
const datasource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'postgres',
    synchronize: false,
    logging: false,
    entities: [Album, Artist, Favorite, Track, User],
    migrations: ['migrations/*.ts'],
});

export default datasource;
