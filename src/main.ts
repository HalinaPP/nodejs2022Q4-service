import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { LoggingInterceptor } from './logger/logging.interceptor';
import { LoggingService } from './logger/logging.service';
import { PORT } from './config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(LoggingService));
  app.useGlobalInterceptors(new LoggingInterceptor());

  const logger = new Logger(AppModule.name);

  process.on('uncaughtException', (err) => {
    logger.error(`uncaughtException: ${err.message}`);
  });

  process.on('unhandledRejection', (err) => {
    logger.error(`unhandledRejection: ${err}`);
  });

  await app.listen(PORT);
}
bootstrap();
