import { Injectable } from '@nestjs/common';
import { JwtService as JWT_SERVICE } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private jwtService: JWT_SERVICE) {}

  sign(payload: any) {
    return this.jwtService.signAsync(payload);
  }

  verify(token: string) {
    return this.jwtService.verifyAsync(token);
  }
}
