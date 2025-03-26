import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Photobooth {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ default: 'ai-photobooth ' })
  event_type: string;
}

export class GeneratePhotoDto {
  @ApiProperty({
    example: '6602f99b5d1e2a1a5f4c1234',
    description: 'ID of the photobooth event',
  })
  @IsNotEmpty()
  eventId: string;
}

export type PhotoboothDocument = Photobooth & Document;
export const PhotoboothSchema = SchemaFactory.createForClass(Photobooth);
