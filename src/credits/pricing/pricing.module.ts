import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PricingController } from './pricing.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pricing, PricingSchema } from './schema/pricing.model';
import { AdminModule } from 'src/admin/admin.module';
import { AdminAuthGuard } from 'src/admin/admin-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pricing.name, schema: PricingSchema }]),
    AdminModule,
  ],
  controllers: [PricingController],
  providers: [PricingService, AdminAuthGuard],
})
export class PricingModule {}
