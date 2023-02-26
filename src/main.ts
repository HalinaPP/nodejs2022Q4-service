import { LoggingService } from './logger/logging.service';
import { PORT } from './config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './logger/logging.interceptor';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      bufferLogs: true,
    });

    app.useGlobalPipes(new ValidationPipe());
    app.useLogger(app.get(LoggingService));
    app.useGlobalInterceptors(new LoggingInterceptor());

    await app.listen(PORT);
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
