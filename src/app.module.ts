import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CatsModule } from './cats/cats.module';
// import { DateScalar } from './common/scalars/date.scalar';

@Module({
  // providers: [DateScalar],
  imports: [
    CatsModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      debug: true,
      playground: true,
    }),
  ],
})
export class AppModule {}
