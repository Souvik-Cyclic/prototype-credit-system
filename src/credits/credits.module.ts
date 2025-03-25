import { Module } from '@nestjs/common';
import { CreditsService } from './credits.service';
import { CreditsController } from './credits.controller';
import { CreditPackModule } from './credit-pack/credit-pack.module';
import { PricingModule } from './pricing/pricing.module';
import { CreditBalanceModule } from './credit-balance/credit-balance.module';

@Module({
  imports: [CreditPackModule, PricingModule, CreditBalanceModule],
  controllers: [CreditsController],
  providers: [CreditsService],
})
export class CreditsModule {}
