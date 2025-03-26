import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Transaction,
  TransactionDocument,
} from './transaction/schema/transaction.model';
import { Model, Types } from 'mongoose';

@Injectable()
export class CreditsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  async getTotalCreditsPurchased(userId: string) {
    const purchases = await this.transactionModel
      .find({
        user: new Types.ObjectId(userId),
        transaction_type: 'purchase',
      })
      .sort({ createdAt: -1 })
      .lean();
    const totalCreditsPurchased = purchases.reduce(
      (total, transaction) => total + (transaction.credit_change || 0),
      0,
    );
    return {
      totalCreditsPurchased,
      transactions: purchases,
    };
  }
}
