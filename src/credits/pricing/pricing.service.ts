import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pricing, PricingDocument } from './schema/pricing.model';
import { Model } from 'mongoose';
import { CreatePricingDto, UpdatePricingDto } from './dto/pricing.dto';

@Injectable()
export class PricingService {
  constructor(
    @InjectModel(Pricing.name)
    private readonly pricingModel: Model<PricingDocument>,
  ) {}

  async create(createPricingDto: CreatePricingDto): Promise<Pricing> {
    const pricing = new this.pricingModel(createPricingDto);
    return pricing.save();
  }

  async findAll(): Promise<Pricing[]> {
    return this.pricingModel.find();
  }

  async findById(id: string): Promise<Pricing> {
    const pricing = await this.pricingModel.findById(id);
    if (!pricing) {
      throw new NotFoundException(`Pricing entry with id ${id} not found`);
    }
    return pricing;
  }

  async findByEventType(event_type: string): Promise<Pricing> {
    const pricing = await this.pricingModel.findOne({ event_type });
    if (!pricing) {
      throw new NotFoundException(
        `Pricing entry for event type ${event_type} not found`,
      );
    }
    return pricing;
  }

  async update(
    id: string,
    updatePricingDto: UpdatePricingDto,
  ): Promise<Pricing> {
    const updatedPricing = await this.pricingModel.findByIdAndUpdate(
      id,
      updatePricingDto,
      { new: true },
    );
    if (!updatedPricing) {
      throw new NotFoundException(`Pricing entry with id ${id} not found`);
    }
    return updatedPricing;
  }

  async remove(id: string): Promise<void> {
    const data = await this.pricingModel.findByIdAndDelete(id);
    if (!data) {
      throw new NotFoundException(`Pricing entry with id ${id} not found`);
    }
  }
}
