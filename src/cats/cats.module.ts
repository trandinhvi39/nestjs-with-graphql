import { Module } from '@nestjs/common';
import { EasyconfigService } from 'nestjs-easyconfig';
import { MongooseModule } from '@nestjs/mongoose';

import { CatsResolvers } from './cats.resolvers';
import { CatsService } from './cats.service';
import { CatsProviders } from './cats.providers';
import { CatSchema } from './schemas/cat.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema }])],
  providers: [CatsService, CatsResolvers],
})
export class CatsModule {}
