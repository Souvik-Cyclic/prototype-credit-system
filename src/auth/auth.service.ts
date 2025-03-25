import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from 'src/jwt/jwt.service';
import { User, UserDocument } from 'src/user/schema/user.model';
import { AuthDto } from './dto/auth.dto';
import {
  CreditBalance,
  CreditBalanceDocument,
} from 'src/credits/schema/credit-balance.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(CreditBalance.name)
    private readonly creditBalanceModel: Model<CreditBalanceDocument>,
    private jwtService: JwtService,
  ) {}

  async signup(singup: AuthDto): Promise<string> {
    const existingUser = await this.userModel.findOne({ email: singup.email });
    if (existingUser) {
      throw new HttpException('User already exists', 400);
    }
    const newuser = new this.userModel(singup);
    await newuser.save();
    await this.creditBalanceModel.create({ user: newuser._id, balance: 0 });
    if (!newuser) {
      throw new HttpException('Signup failed', 400);
    }
    const token = await this.jwtService.sign({ _id: newuser._id });
    if (!token) {
      throw new HttpException('Token generation failed', 400);
    }
    return token;
  }

  async login(login: AuthDto): Promise<string> {
    const user = await this.userModel.findOne({ email: login.email });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    if (user.password !== login.password) {
      throw new HttpException('Invalid Credentials', 401);
    }
    const token = await this.jwtService.sign({ _id: user._id });
    if (!token) {
      throw new HttpException('Token generation failed', 400);
    }
    return token;
  }
}
