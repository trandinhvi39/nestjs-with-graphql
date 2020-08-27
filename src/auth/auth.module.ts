import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolvers } from './auth.resolvers';
import constant from '../configs/constant';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: constant.jwt.expiresIn },
    }),
  ],
  providers: [AuthService, AuthResolvers, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
