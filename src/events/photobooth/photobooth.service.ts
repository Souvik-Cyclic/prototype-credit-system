import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CreditBalance,
  CreditBalanceDocument,
} from 'src/credits/credit-balance/schema/credit-balance.model';
import {
  Pricing,
  PricingDocument,
} from 'src/credits/pricing/schema/pricing.model';
import {
  Transaction,
  TransactionDocument,
} from 'src/credits/transaction/schema/transaction.model';
import { Photobooth, PhotoboothDocument } from './model/photobooth.model';

@Injectable()
export class PhotoboothService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
    @InjectModel(CreditBalance.name)
    private readonly creditBalanceModel: Model<CreditBalanceDocument>,
    @InjectModel(Pricing.name)
    private readonly pricingModel: Model<PricingDocument>,
    @InjectModel(Photobooth.name)
    private readonly photoboothModel: Model<PhotoboothDocument>,
  ) {}

  async createEvent(userId: string, name: string) {
    const photobooth = await this.photoboothModel.create({
      user: new Types.ObjectId(userId),
      name,
      event_type: 'ai-photobooth',
    });
    return photobooth;
  }

  async generate(userId: string, eventId: string) {
    const session = await this.transactionModel.startSession();
    session.startTransaction();

    try {
      const pricing = await this.pricingModel
        .findOne({ event_type: 'ai-photobooth' })
        .lean();
      if (!pricing) {
        throw new Error('Pricing information not found.');
      }
      const creditsRequired = pricing.credits_standard;
      const userBalance = await this.creditBalanceModel
        .findOne({ user: new Types.ObjectId(userId) })
        .session(session);
      if (!userBalance || userBalance.current_credits < creditsRequired) {
        throw new Error('Insufficient credits. Please purchase more credits.');
      }
      userBalance.current_credits -= creditsRequired;
      await userBalance.save({ session });
      await this.transactionModel.create(
        [
          {
            user: new Types.ObjectId(userId),
            credit_change: -creditsRequired,
            transaction_type: 'usage',
            event_type: 'photobooth-ai',
          },
        ],
        { session },
      );
      await session.commitTransaction();
      session.endSession();
      return { message: 'Photo generated successfully', eventId };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}
