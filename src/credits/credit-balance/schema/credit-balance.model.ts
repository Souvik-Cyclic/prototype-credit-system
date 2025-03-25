import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CreditBalanceDocument = CreditBalance & Document;

@Schema({ timestamps: true, versionKey: false })
export class CreditBalance {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true,
  })
  user: Types.ObjectId;

  @Prop({ required: true, default: 0, type: Number })
  current_credits: number;
}

export const CreditBalanceSchema = SchemaFactory.createForClass(CreditBalance);
