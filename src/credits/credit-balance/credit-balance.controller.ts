import { Controller } from '@nestjs/common';
import { CreditBalanceService } from './credit-balance.service';

@Controller('credit-balance')
export class CreditBalanceController {
  constructor(private readonly creditBalanceService: CreditBalanceService) {}
}
