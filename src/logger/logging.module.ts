import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/errors/all-exceptions.filter';
import { LoggingService } from './logging.service';

@Module({
  providers: [
    LoggingService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  exports: [LoggingService],
})
export class LoggingModule { }
