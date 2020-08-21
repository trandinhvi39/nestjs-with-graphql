import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { MongooseModule } from '@nestjs/mongoose';
import * as path from 'path';
import {
  I18nModule,
  I18nJsonParser,
  QueryResolver,
  CookieResolver,
  HeaderResolver,
} from 'nestjs-i18n';
const { FormatErrorWithContextExtension } = require('graphql-format-error-context-extension');

// import { DateScalar } from './scalars/date.scalar';
import { CatsModule } from './cats/cats.module';
import { ConfigService } from './configs/config.service';
import { ConfigModule } from './configs/config.module';
import { SeedModule } from './seeds/seed.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import constant from './configs/constant';
import formatErrorResponse from './configs/formatError';

@Module({
  // providers: [DateScalar],
  imports: [
    CatsModule,
    HealthcheckModule,
    SeedModule,
    EasyconfigModule.register({ path: '.env', safe: true }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '/i18n/'),
      },
      resolvers: [
        { use: QueryResolver, options: ['lang', 'locale', 'l'] },
        new HeaderResolver(['x-custom-lang']),
        new CookieResolver(['lang', 'locale', 'l']),
      ],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('DB_AUTH')}${configService.get(
          'DB_HOST',
        )}:${configService.get('DB_PORT')}/${configService.get('DB_NAME')}`,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      introspection: true,
      playground: process.env.APP_ENV !== 'prod',
      uploads: {
        maxFileSize: constant.fileUploadConfig.maxFileSize,
        maxFiles: constant.fileUploadConfig.maxFiles,
      },
      extensions: [() => new FormatErrorWithContextExtension(formatErrorResponse)],
      subscriptions: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        onConnect: async (connectionParams, webSocket) => console.log('Connect'),
        /* eslint-disable @typescript-eslint/no-unused-vars */
        onDisconnect: async (webSocket, connectionParams) => console.log('Disconnect'),
        keepAlive: constant.subscriptions.keepAlive,
      },
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
