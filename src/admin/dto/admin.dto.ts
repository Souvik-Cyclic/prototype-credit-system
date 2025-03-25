import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

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

export class AddCreditsDto {
  @ApiProperty({ example: 'souvik.cyc@gmail.com', description: 'User Email' })
  @IsEmail({}, { message: 'Invalid Email Format' })
  email: string;

  @ApiProperty({ example: 100, description: 'Number of Credits to be added' })
  @IsInt({ message: 'Credits must be an integer' })
  @Min(1, { message: 'Credits must be greater than 0' })
  credits: number;
}

export class ModifyCreditsDto {
  @ApiProperty({ example: 'souvik.cyc@gmail.com', description: 'User Email' })
  @IsEmail({}, { message: 'Invalid Email Format' })
  email: string;

  @ApiProperty({ example: 100, description: 'Number of Credits' })
  newCredits: number;
}
