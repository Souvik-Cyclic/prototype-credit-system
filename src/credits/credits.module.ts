import { Module } from '@nestjs/common';
import { CreditsService } from './credits.service';
import { CreditsController } from './credits.controller';
import { CreditPackModule } from './credit-pack/credit-pack.module';

@Module({
  imports: [CreditPackModule],
  controllers: [CreditsController],
  providers: [CreditsService],
})
export class CreditsModule {}
