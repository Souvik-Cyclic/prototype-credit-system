import { Module } from '@nestjs/common';
import { CreditsService } from './credits.service';
import { CreditsController } from './credits.controller';
import { CreditPackModule } from './credit-pack/credit-pack.module';
import { PricingModule } from './pricing/pricing.module';
import { CreditBalanceModule } from './credit-balance/credit-balance.module';
import { TransactionModule } from './transaction/transaction.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Transaction,
  TransactionSchema,
} from './transaction/schema/transaction.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    CreditPackModule,
    PricingModule,
    CreditBalanceModule,
    TransactionModule,
    AuthModule,
  ],
  controllers: [CreditsController],
  providers: [CreditsService],
})
export class CreditsModule {}
