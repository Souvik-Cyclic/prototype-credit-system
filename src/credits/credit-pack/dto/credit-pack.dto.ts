import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateCreditPackDto {
  @ApiProperty({
    description: 'Name of the Credit Pack',
    example: 'Basic',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the Credit Pack',
    example: 'Basic Credit Pack: Perfect for beginners',
    type: String,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Amount of Credit',
    example: 300,
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  credit_amount: number;

  @ApiProperty({
    description: 'Price of the Credit Pack',
    example: 150,
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'Status of the Credit Pack',
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  is_active: boolean;
}

export class UpdateCreditPackDto {
    @ApiProperty({
        description: 'Updated Name of the Credit Pack',
        example: 'Enterprise',
        type: String,
        required: false,
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
        description: 'Updated Description of the Credit Pack',
        example: 'Enterprise Credit Pack: Perfect for businesses',
        type: String,
        required: false,
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        description: 'Updated Amount of Credit',
        example: 500,
        type: Number,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    credit_amount?: number;

    @ApiProperty({
        description: 'Updated Price of the Credit Pack',
        example: 1000,
        type: Number,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    price?: number;

    @ApiProperty({
        description: 'Updated Status of the Credit Pack',
        example: true,
        type: Boolean,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}