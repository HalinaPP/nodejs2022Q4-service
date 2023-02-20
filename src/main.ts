import { PORT } from './config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT);
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
