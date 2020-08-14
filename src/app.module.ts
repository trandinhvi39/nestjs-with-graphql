import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { MongooseModule } from '@nestjs/mongoose';

// import { DateScalar } from './scalars/date.scalar';
import { CatsModule } from './cats/cats.module';
import { ConfigService } from './configs/config.service';
import { ConfigModule } from './configs/config.module';

@Module({
  // providers: [DateScalar],
  imports: [
    CatsModule,
    EasyconfigModule.register({ path: '.env', safe: true }),
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
      debug: true,
      playground: true,
    }),
  ],
})
export class AppModule {}
