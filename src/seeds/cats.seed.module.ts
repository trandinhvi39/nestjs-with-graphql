import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { MongooseModule } from '@nestjs/mongoose';

import { CatsSeed } from '../cats/cats.seed';
import { CatSchema } from '../cats/schemas/cat.schema';

@Module({
  imports: [CommandModule, MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema }])],
  providers: [CatsSeed],
  exports: [CatsSeed],
})
export class CatsSeedModule {}
