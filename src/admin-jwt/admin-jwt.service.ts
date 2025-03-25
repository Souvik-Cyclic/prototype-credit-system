import { Injectable } from '@nestjs/common';
import { JwtService as JWT_SERVICE } from '@nestjs/jwt';

@Injectable()
export class AdminJwtService {
  constructor(private jwtService: JWT_SERVICE) {}

  sign(payload: any) {
    return this.jwtService.signAsync({ ...payload, role: 'admin' });
  }

  async verify(token: string) {
    const decoded = await this.jwtService.verifyAsync(token);
    if (decoded.role !== 'admin') {
      throw new Error('Invalid Admin Token');
    }
    return decoded;
  }
}
