import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from 'src/jwt/jwt.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CreditBalance,
  CreditBalanceSchema,
} from 'src/credits/credit-balance/schema/credit-balance.model';

@Module({
  imports: [
    UserModule,
    JwtModule,
    MongooseModule.forFeature([
      { name: CreditBalance.name, schema: CreditBalanceSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
