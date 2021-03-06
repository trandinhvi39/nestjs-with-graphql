import { UseGuards, UseFilters, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';

import { Cat } from '../schema/graphql.schema';
import { CatsGuard } from './cats.guard';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { User as CurrentUser } from '../users/users.decorator';
import { User } from '../users/interfaces/user.interface';

@Resolver('Cat')
export class CatsResolvers {
  constructor(
    @Inject('pubsub') private pubSub: PubSubEngine,
    private readonly catsService: CatsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query()
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async getCats(@CurrentUser() user: User): Promise<Array<Cat>> {
    return this.catsService.findAll();
  }

  @UseGuards(CatsGuard)
  @Query('cat')
  async cat(@Args('id') id: string): Promise<Cat> {
    return this.catsService.findOneById(id);
  }

  @Mutation('createCat')
  @UseFilters(new HttpExceptionFilter())
  async create(@Args('createCatInput') args: CreateCatDto): Promise<Cat> {
    const createdCat = await this.catsService.create(args);
    this.pubSub.publish('catCreated', { catCreated: createdCat });
    return createdCat;
  }

  @Subscription('catCreated', {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    filter: (that: CatsResolvers, payload, variables) => true,
  })
  catCreated(): AsyncIterator<Cat> {
    return this.pubSub.asyncIterator('catCreated');
  }
}
