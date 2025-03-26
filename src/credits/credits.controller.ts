import {
  Controller,
  Get,
  Req,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CreditsService } from './credits.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { errorHandler, OK } from 'src/response/response.util';
import { Response } from 'express';

@Controller('credits')
export class CreditsController {
  constructor(private readonly creditsService: CreditsService) {}

  @Get('total-purchases')
  @ApiOperation({ summary: 'Get total credits user has purchased till now.' })
  @ApiResponse({
    status: 200,
    description: 'Total credits user has purchased.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getTotalCreditsPurchased(@Res() res: Response, @Req() req) {
    try {
      const userId = req.user._id;
      const data = await this.creditsService.getTotalCreditsPurchased(userId);
      return OK(res, 'Total Credits Purchased', data, HttpStatus.OK);
    } catch (error) {
      return errorHandler(error, res);
    }
  }
}
