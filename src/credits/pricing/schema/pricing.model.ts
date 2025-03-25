import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PricingDocument = Pricing & Document;

@Schema({ timestamps: true, versionKey: false })
export class Pricing {
  @Prop({ required: true, unique: true })
  event_type: string;

  @Prop({ required: true, type: Number })
  credits_standard: number;

  @Prop({ type: Number })
  credits_with_gpu?: number;
}

export const PricingSchema = SchemaFactory.createForClass(Pricing);
