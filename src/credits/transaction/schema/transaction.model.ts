import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true, versionKey: false })
export class Transaction {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  user: Types.ObjectId;

  @Prop({ required: true, type: Number })
  credit_change: number;

  @Prop({
    required: true,
    enum: ['purchase', 'usage', 'refund', 'gift', 'modified'],
  })
  transaction_type: string;

  @Prop()
  event_type?: string;

  @Prop()
  event_id?: string;

  @Prop()
  event_name?: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
