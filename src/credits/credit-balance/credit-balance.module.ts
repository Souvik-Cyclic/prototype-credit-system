import { Module } from '@nestjs/common';
import { CreditBalanceService } from './credit-balance.service';
import { CreditBalanceController } from './credit-balance.controller';

@Module({
  controllers: [CreditBalanceController],
  providers: [CreditBalanceService],
})
export class CreditBalanceModule {}
