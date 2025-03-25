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
import { AddCreditsDto, AdminLoginDto } from './dto/admin.dto';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  @ApiOperation({ summary: 'Admin Login' })
  @ApiResponse({ status: 200, description: 'Admin Login Successful' })
  async adminLogin(@Res() res: Response, @Body() body: AdminLoginDto) {
    try {
      const token = await this.adminService.login(body.username, body.password);
      return OK(
        res,
        'Admin Login Successful',
        { admin_token: token },
        HttpStatus.OK,
      );
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
      const adminInfo = this.adminService.getAdminDetails();
      return OK(res, 'Admin Details', adminInfo, HttpStatus.OK);
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  @Post('add-credits')
  @ApiOperation({ summary: 'Add Credits to a User' })
  @ApiResponse({ status: 200, description: 'Credits Added Successfully' })
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  async addCredits(@Res() res: Response, @Body() body: AddCreditsDto) {
    try {
      const result = await this.adminService.addCredits(
        body.email,
        body.credits,
      );
      return OK(res, 'Credits Added Successfully', result, HttpStatus.OK);
    } catch (error) {
      return errorHandler(error, res);
    }
  }
}
