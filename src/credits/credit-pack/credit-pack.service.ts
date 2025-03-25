import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreditPack, CreditPackDocument } from './schema/credit-pack.model';
import { Model } from 'mongoose';
import { CreateCreditPackDto, UpdateCreditPackDto } from './dto/credit-pack.dto';

@Injectable()
export class CreditPackService {
  constructor(
    @InjectModel(CreditPack.name)
    private readonly creditPackModel: Model<CreditPackDocument>,
  ) {}

  async create(createCreditPackDto: CreateCreditPackDto): Promise<CreditPack> {
    return this.creditPackModel.create(createCreditPackDto);
  }

  async findAll(filter: Record<string, any>={}): Promise<CreditPack[]> {
    return this.creditPackModel.find(filter);
  }

  async findOne(id: string): Promise<CreditPack | null> {
    return this.creditPackModel.findById(id);
  }

  async remove(id: string): Promise<CreditPack | null> {
    return this.creditPackModel.findByIdAndDelete(id);
  }

  async update(id: string, updateCreditPackDto: UpdateCreditPackDto): Promise<CreditPack> {
    const updatedCreditPack = await this.creditPackModel.findByIdAndUpdate(id, updateCreditPackDto, { new: true });
    if (!updatedCreditPack) {
      throw new NotFoundException('Credit Pack not found');
    }
    return updatedCreditPack;
  }
}
