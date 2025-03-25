import { Module } from '@nestjs/common';
import { JwtModule as JWT_MODULE } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AdminJwtService } from './admin-jwt.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JWT_MODULE.register({
      global: true,
      secret: process.env.ADMIN_JWT_SECRET,
      signOptions: {
        expiresIn: process.env.ADMIN_JWT_EXPIRATION,
      },
    }),
  ],
  providers: [AdminJwtService],
  exports: [AdminJwtService],
})
export class AdminJwtModule {}
