import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(): Promise<object> {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials
    const user: any = { email: 'user@email.com' };
    const token: string = this.jwtService.sign(user);
    return { token };
  }

  async validateUser(payload: any): Promise<any> {
    // Validate if token passed along with HTTP request
    // is associated with any registered account in the database
    return await this.userService.read(payload.email);
  }
}