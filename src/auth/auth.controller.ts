import {
  Controller,
  Post,
  Res,
  ValidationPipe,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { OK, errorHandler } from 'src/response/response.util';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up', description: 'Sign up' })
  @ApiResponse({ status: 201, description: 'Sign up' })
  async signUp(
    @Res() res: Response,
    @Body(new ValidationPipe()) body: AuthDto,
  ) {
    try {
      const token = await this.authService.signup(body);
      return OK(res, 'Signup successful', { token }, HttpStatus.CREATED);
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login', description: 'Login' })
  @ApiResponse({ status: 200, description: 'Login' })
  async login(@Res() res: Response, @Body(new ValidationPipe()) body: AuthDto) {
    try {
      const token = await this.authService.login(body);
      return OK(res, 'Login successful', { token }, HttpStatus.OK);
    } catch (error) {
      return errorHandler(error, res);
    }
  }
}
