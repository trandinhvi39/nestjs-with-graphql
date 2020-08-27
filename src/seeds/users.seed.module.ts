import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersSeed } from '../users/users.seed';
import { UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [CommandModule, MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UsersSeed],
  exports: [UsersSeed],
})
export class UsersSeedModule {}
