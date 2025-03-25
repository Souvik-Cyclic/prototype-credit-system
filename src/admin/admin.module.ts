import { Module, forwardRef } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminJwtModule } from 'src/admin-jwt/admin-jwt.module';
import { AdminJwtService } from 'src/admin-jwt/admin-jwt.service';
import { AdminAuthGuard } from './admin-auth.guard';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CreditBalance,
  CreditBalanceSchema,
} from 'src/credits/credit-balance/schema/credit-balance.model';
import {
  Transaction,
  TransactionSchema,
} from 'src/credits/transaction/schema/transaction.model';

@Module({
  imports: [
    AdminJwtModule,
    forwardRef(() => UserModule),
    MongooseModule,
    MongooseModule.forFeature([
      { name: CreditBalance.name, schema: CreditBalanceSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminJwtService, AdminAuthGuard],
  exports: [
    AdminService,
    AdminJwtService,
    AdminAuthGuard,
    forwardRef(() => UserModule),
  ],
})
export class AdminModule {}
