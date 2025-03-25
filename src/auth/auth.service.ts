import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from 'src/jwt/jwt.service';
import { User, UserDocument } from 'src/user/schema/user.model';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signup(singup: AuthDto): Promise<string> {
    const existingUser = await this.userModel.findOne({ email: singup.email });
    if (existingUser) {
      throw new HttpException('User already exists', 400);
    }
    const newuser = new this.userModel(singup);
    await newuser.save();
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
