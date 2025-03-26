import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  Get,
  UseGuards,
  Query,
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
import {
  AddCreditsDto,
  AdminLoginDto,
  ModifyCreditsDto,
} from './dto/admin.dto';
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

  @Get('check-credits')
  @ApiOperation({ summary: 'Check Credits of a User' })
  @ApiResponse({
    status: 200,
    description: 'User Credits Retrieved Successfully',
  })
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  async checkCredits(@Res() res: Response, @Query('email') email: string) {
    try {
      const data = await this.adminService.checkUserCredits(email);
      return OK(
        res,
        'User Credits Retrieved Successfully',
        { email, current_credits: data },
        HttpStatus.OK,
      );
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  @Post('modify-credits')
  @ApiOperation({ summary: 'Modify Credits of a User' })
  @ApiResponse({ status: 200, description: 'Credits Modified Successfully' })
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  async modifyCredits(@Res() res: Response, @Body() body: ModifyCreditsDto) {
    try {
      const data = await this.adminService.modifyCredits(
        body.email,
        body.newCredits,
      );
      return OK(res, 'Credits Modified Successfully', data, HttpStatus.OK);
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  @Get('check-credit-history')
  @ApiOperation({ summary: 'Check Credit History of a User' })
  @ApiResponse({
    status: 200,
    description: 'User Credit History Retrieved Successfully',
  })
  async getUserCreditHistory(
    @Res() res: Response,
    @Query('email') email: string,
  ) {
    try {
      const data = await this.adminService.getUserCreditHistory(email);
      return OK(
        res,
        'User Credit History Retrieved Successfully',
        data,
        HttpStatus.OK,
      );
    } catch (error) {
      return errorHandler(error, res);
    }
  }
}
