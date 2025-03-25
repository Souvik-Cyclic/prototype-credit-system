import {
  Controller,
  Res,
  Post,
  Body,
  HttpStatus,
  Get,
  UseGuards,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PricingService } from './pricing.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePricingDto, UpdatePricingDto } from './dto/pricing.dto';
import { errorHandler } from 'src/response/response.util';
import { Response } from 'express';
import { OK } from 'src/response/response.util';
import { AdminAuthGuard } from 'src/admin/admin-auth.guard';

@ApiTags('Pricing')
@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new pricing for an event type' })
  @ApiResponse({ status: 201, description: 'Pricing created successfully' })
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  async create(
    @Res() res: Response,
    @Body() createPricingDto: CreatePricingDto,
  ) {
    try {
      const data = await this.pricingService.create(createPricingDto);
      return OK(res, 'Pricing created successfully', data, HttpStatus.CREATED);
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all pricing entries' })
  @ApiResponse({ status: 200, description: 'All pricing entries' })
  async findAll(@Res() res: Response) {
    try {
      const data = await this.pricingService.findAll();
      return OK(
        res,
        'Successfully fetched all pricing entries',
        data,
        HttpStatus.OK,
      );
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  @Get('event-type/:event_type')
  @ApiOperation({ summary: 'Get pricing entry by event type' })
  @ApiResponse({ status: 200, description: 'Pricing entry' })
  async getPricingByEventType(
    @Res() res: Response,
    @Param('event_type') event_type: string,
  ) {
    try {
      const data = await this.pricingService.findByEventType(event_type);
      return OK(res, 'Successfully fetched pricing entry', data, HttpStatus.OK);
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Get pricing entry by id' })
  @ApiResponse({ status: 200, description: 'Pricing entry' })
  async getPricingById(@Res() res: Response, @Param('id') id: string) {
    try {
      const data = await this.pricingService.findById(id);
      return OK(res, 'Successfully fetched pricing entry', data, HttpStatus.OK);
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  @Put('id/:id')
  @ApiOperation({ summary: 'Update pricing entry by id' })
  @ApiResponse({ status: 200, description: 'Pricing entry updated' })
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updatePricingDto: UpdatePricingDto,
  ) {
    try {
      const data = await this.pricingService.update(id, updatePricingDto);
      return OK(res, 'Pricing entry updated successfully', data, HttpStatus.OK);
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  @Delete('id/:id')
  @ApiOperation({ summary: 'Delete pricing entry by id' })
  @ApiResponse({ status: 200, description: 'Pricing entry deleted' })
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  async delete(@Res() res: Response, @Param('id') id: string) {
    try {
      await this.pricingService.remove(id);
      return OK(res, 'Pricing entry deleted successfully', null, HttpStatus.OK);
    } catch (error) {
      return errorHandler(error, res);
    }
  }
}
