import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePricingDto {
  @ApiProperty({
    example: 'AI-Photobooth',
    description: 'The name of the event type',
  })
  @IsString()
  @IsNotEmpty()
  event_type: string;

  @ApiProperty({
    example: 2,
    description: 'Standard pricing of the event type',
  })
  @IsNumber()
  @IsNotEmpty()
  credits_standard: number;

  @ApiProperty({
    example: 6,
    description: 'GPU pricing of the event type',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  credits_with_gpu?: number;
}

export class UpdatePricingDto {
  @ApiProperty({
    example: 'AI-Photobooth',
    description: 'The name of the event type',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  event_type: string;

  @ApiProperty({
    example: 2,
    description: 'Standard pricing of the event type',
    required: false,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  credits_standard: number;

  @ApiProperty({
    example: 6,
    description: 'GPU pricing of the event type',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  credits_with_gpu?: number;
}
