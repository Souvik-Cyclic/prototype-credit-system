import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new HttpException('Missing token', HttpStatus.NO_CONTENT);
      }
      try {
        const payload = await this.jwtService.verify(token);
        request['user'] = payload;
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          throw new HttpException('Token expired', HttpStatus.UNAUTHORIZED);
        } else {
          throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
