import { Module } from '@nestjs/common';
import { PhotoboothService } from './photobooth.service';
import { PhotoboothController } from './photobooth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Photobooth, PhotoboothSchema } from './model/photobooth.model';
import {
  Transaction,
  TransactionSchema,
} from 'src/credits/transaction/schema/transaction.model';
import {
  CreditBalance,
  CreditBalanceSchema,
} from 'src/credits/credit-balance/schema/credit-balance.model';
import {
  Pricing,
  PricingSchema,
} from 'src/credits/pricing/schema/pricing.model';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      { name: Photobooth.name, schema: PhotoboothSchema },
      { name: Transaction.name, schema: TransactionSchema },
      { name: CreditBalance.name, schema: CreditBalanceSchema },
      { name: Pricing.name, schema: PricingSchema },
    ]),
  ],
  controllers: [PhotoboothController],
  providers: [PhotoboothService],
})
export class PhotoboothModule {}
