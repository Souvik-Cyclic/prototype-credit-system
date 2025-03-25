import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.model';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userModel.findById(id);
  }

  async deleteUser(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id);
    await this.userModel.findByIdAndDelete(id);
    return user;
  }

  async updateUser(id: string, update: UpdateUserDto): Promise<User | null> {
    if (!update || Object.keys(update).length === 0) {
        throw new Error("No update data provided");
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { $set: update },
      {
        new: true,
        runValidators: true,
        strict: false,
      }
    )
    return updatedUser;
}
}
