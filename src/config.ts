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

export const logDirectory = 'logs';
export const errorLogFileName = 'error.log';
export const logFileName = 'log.log';
