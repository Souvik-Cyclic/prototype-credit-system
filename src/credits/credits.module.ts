import { Module } from '@nestjs/common';
import { CreditsService } from './credits.service';
import { CreditsController } from './credits.controller';
import { CreditPackModule } from './credit-pack/credit-pack.module';
import { PricingModule } from './pricing/pricing.module';
import { CreditBalanceModule } from './credit-balance/credit-balance.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    CreditPackModule,
    PricingModule,
    CreditBalanceModule,
    TransactionModule,
  ],
  controllers: [CreditsController],
  providers: [CreditsService],
})
export class CreditsModule {}
