import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminJwtModule } from 'src/admin-jwt/admin-jwt.module';
import { AdminJwtService } from 'src/admin-jwt/admin-jwt.service';
import { AdminAuthGuard } from './admin-auth.guard';

@Module({
  imports: [AdminJwtModule],
  controllers: [AdminController],
  providers: [AdminJwtService, AdminAuthGuard],
  exports: [AdminJwtService, AdminAuthGuard],
})
export class AdminModule {}
