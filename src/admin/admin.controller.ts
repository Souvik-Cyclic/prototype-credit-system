import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  UnauthorizedException,
  Get,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { OK, errorHandler } from 'src/response/response.util';
import { AdminAuthGuard } from './admin-auth.guard';
import { AdminLoginDto } from './dto/admin.dto';
import { AdminJwtService } from 'src/admin-jwt/admin-jwt.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminJwtService: AdminJwtService) {}

  @Post('login')
  @ApiOperation({ summary: 'Admin Login' })
  @ApiResponse({ status: 200, description: 'Admin Login Successful' })
  async adminLogin(@Res() res: Response, @Body() body: AdminLoginDto) {
    try {
      const { username, password } = body;
      if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
      ) {
        const token = await this.adminJwtService.sign({
          username,
          role: 'admin',
        });
        return OK(
          res,
          'Admin Login Successful',
          { admin_token: token },
          HttpStatus.OK,
        );
      }
      throw new UnauthorizedException('Invalid Admin Credentials');
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  @Get('')
  @ApiOperation({
    summary: 'Get Admin Details',
    description: 'Returns admin info',
  })
  @ApiResponse({ status: 200, description: 'Admin Details' })
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  async getAdminDetails(@Res() res: Response) {
    try {
      const adminInfo = {
        username: process.env.ADMIN_USERNAME,
        role: 'Admin',
      };
      return OK(res, 'Admin Details', adminInfo, HttpStatus.OK);
    } catch (error) {
      return errorHandler(error, res);
    }
  }
}
