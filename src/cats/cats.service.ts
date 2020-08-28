import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { I18nRequestScopeService } from 'nestjs-i18n';

import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel('Cat') private readonly catModel: Model<Cat>,
    private readonly i18n: I18nRequestScopeService,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    //await this.i18n.translate('cat.key')
    const createdCat = new this.catModel(createCatDto);
    await createdCat.save();
    return createdCat.toClient();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findOneById(id: string): Promise<Cat> {
    return this.catModel.findOne({ _id: id }).exec();
  }
}
