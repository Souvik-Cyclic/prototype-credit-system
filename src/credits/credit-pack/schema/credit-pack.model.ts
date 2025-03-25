import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CreditPackDocument = CreditPack & Document;

@Schema({ timestamps: true, versionKey: false })
export class CreditPack {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true, type: Number })
  credit_amount: number;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop()
  is_active: boolean;
}

export const CreditPackSchema = SchemaFactory.createForClass(CreditPack);
