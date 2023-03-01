import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;

export const dataBaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'postgres',
};

export const LOGGING_LEVELS = ['log', 'error', 'warn', 'verbose', 'debug'];
const LEVEL_LOG = 4;
export const LOGGING_LEVEL = +process.env.LOGGING_LEVEL || LEVEL_LOG;

export const authConfig = {
  CRYPT_SALT: process.env.CRYPT_SALT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY: process.env.JWT_SECRET_REFRESH_KEY,
  TOKEN_EXPIRE_TIME: process.env.TOKEN_EXPIRE_TIME,
  TOKEN_REFRESH_EXPIRE_TIME: process.env.TOKEN_REFRESH_EXPIRE_TIME,
};

export const logDirectory = 'logs';
export const errorLogFileName = 'error.log';
export const logFileName = 'log.log';
