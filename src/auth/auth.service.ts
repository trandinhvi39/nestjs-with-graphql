import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { User } from '../users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(username);
    const isMatchingPassword = await bcrypt.compare(password, user.password);
    if (user && isMatchingPassword) return user;
    return null;
  }

  async login(user: any) {
    const payload = user.toJSON();
    payload.id = payload._id;
    delete payload._id;
    delete payload.password;
    return { accessToken: this.jwtService.sign(payload) };
  }
}
