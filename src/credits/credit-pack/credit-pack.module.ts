import { Module } from '@nestjs/common';
import { CreditPackService } from './credit-pack.service';
import { CreditPackController } from './credit-pack.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CreditPack, CreditPackSchema } from './schema/credit-pack.model';
import { AdminJwtService } from 'src/admin-jwt/admin-jwt.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CreditPack.name, schema: CreditPackSchema },
    ]),
  ],
  controllers: [CreditPackController],
  providers: [CreditPackService, AdminJwtService],
  exports: [CreditPackService, AdminJwtService],
})
export class CreditPackModule {}
