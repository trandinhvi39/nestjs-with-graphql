import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import rateLimit from 'express-rate-limit';

import { AppModule } from './app.module';
import { ConfigService } from './configs/config.service';
import constant from './configs/constant';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    rateLimit({
      windowMs: constant.rateLimit.windowMs,
      max: constant.rateLimit.max,
    }),
  );
  app.enableCors();
  // see https://expressjs.com/en/guide/behind-proxies.html
  app.set('trust proxy', 1);
  app.useGlobalPipes(new ValidationPipe());
  const configService: ConfigService = app.get(ConfigService);
  await app.listen(configService.get('GRAPHQL_SERVER_PORT'));
}
bootstrap();
