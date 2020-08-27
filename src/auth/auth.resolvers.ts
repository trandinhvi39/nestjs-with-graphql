import { UseGuards, Inject, Injectable, Scope } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Injectable({ scope: Scope.REQUEST })
@Resolver('Auth')
export class AuthResolvers {
  constructor(
    private authService: AuthService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Query('login')
  async login(): Promise<any> {
    return this.authService.login(this.request.user);
  }
}
