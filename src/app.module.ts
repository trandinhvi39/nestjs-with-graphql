import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CatsModule } from './cats/cats.module';
import { EasyconfigModule } from 'nestjs-easyconfig';
// import { DateScalar } from './common/scalars/date.scalar';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // providers: [DateScalar],
  imports: [
    CatsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nestjsDemo'),
    EasyconfigModule.register({ path: '.env', safe: true }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      debug: true,
      playground: true,
    }),
  ],
})
export class AppModule {}
