import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({
        description: 'New Email',
        example: 'souvik.cyc@gmail.com',
        type: String
    })
    @IsEmail()
    @IsOptional()
    @IsNotEmpty()
    email?: string;

    @ApiProperty({
        description: 'New Password',
        example: '123456',
        type: String
    })
    @IsOptional()
    @IsNotEmpty()
    password?: string;
}