import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminJwtService } from 'src/admin-jwt/admin-jwt.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly adminJwtService: AdminJwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Unauthorized');
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = await this.adminJwtService.verify(token);
      if (decoded.role !== 'admin') {
        throw new UnauthorizedException('Invalid or expired admin token');
      }
      req.admin = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired admin token');
    }
  }
}
