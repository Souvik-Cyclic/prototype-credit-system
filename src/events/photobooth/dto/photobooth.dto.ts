import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePhotoboothDto {
  @ApiProperty({ example: 'My Birthday Booth', description: 'Photobooth name' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
