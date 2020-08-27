import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './interfaces/user.interface';

@Injectable()
export class UsersSeed {
  constructor(@InjectModel('User') private readonly catModel: Model<User>) {}

  @Command({ command: 'seed:users', describe: 'Seed users data', autoExit: true })
  async create(): Promise<void> {
    for (let i = 0; i < 10; i++) {
      await new this.catModel({
        name: `User ${i}`,
        email: `nestjs${i}@demo.com`,
        password: 'abc123',
      }).save();
    }
  }
}
