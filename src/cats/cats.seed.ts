import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsSeed {
  constructor(@InjectModel('Cat') private readonly catModel: Model<Cat>) {}

  @Command({ command: 'seed:cats', describe: 'Seed cats data', autoExit: true })
  async create() {
    for (let i = 0; i < 10; i++) {
      const createdCat = await new this.catModel({
        name: `Cat ${i}`,
        age: Math.floor(Math.random() * 10) + 1,
      }).save();
    }
  }
}
