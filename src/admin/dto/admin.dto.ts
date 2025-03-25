import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdminLoginDto {
  @ApiProperty({
    description: 'Admin Username',
    example: 'admin',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Admin Password',
    example: 'admin',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
