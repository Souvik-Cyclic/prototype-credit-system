import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AdminJwtService } from 'src/admin-jwt/admin-jwt.service';
import { User, UserDocument } from 'src/user/schema/user.model';
import {
  CreditBalance,
  CreditBalanceDocument,
} from 'src/credits/schema/credit-balance.model';
import {
  Transaction,
  TransactionDocument,
} from 'src/credits/schema/transaction.model';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminJwtService: AdminJwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(CreditBalance.name)
    private creditBalanceModel: Model<CreditBalanceDocument>,
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async login(username: string, password: string) {
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return this.adminJwtService.sign({ username, role: 'admin' });
    }
    throw new UnauthorizedException('Invalid Admin Credentials');
  }

  getAdminDetails() {
    return { username: process.env.ADMIN_USERNAME, role: 'Admin' };
  }

  async addCredits(email: string, credits: number) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const user = await this.userModel.findOne({ email }).session(session);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      let creditBalance = await this.creditBalanceModel
        .findOne({ user: user._id })
        .session(session);
      if (!creditBalance) {
        creditBalance = new this.creditBalanceModel({
          user: user._id,
          current_credits: credits,
        });
      } else {
        creditBalance.current_credits += credits;
      }
      await creditBalance.save({ session });

      const transaction = new this.transactionModel({
        user: user._id,
        credit_change: credits,
        transaction_type: 'purchase',
      });
      await transaction.save({ session });

      await session.commitTransaction();
      session.endSession();

      return { email, credits, new_balance: creditBalance.current_credits };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}
