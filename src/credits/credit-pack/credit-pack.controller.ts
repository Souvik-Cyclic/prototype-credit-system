import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  Get,
  UseGuards,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { CreditPackService } from './credit-pack.service';
import {
  CreateCreditPackDto,
  UpdateCreditPackDto,
} from './dto/credit-pack.dto';
import { errorHandler } from 'src/response/response.util';
import { Response } from 'express';
import { OK } from 'src/response/response.util';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/admin/admin-auth.guard';

@ApiTags('Credit Packs')
@Controller('credit-pack')
export class CreditPackController {
  constructor(private readonly creditPackService: CreditPackService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a credit pack',
    description: 'Create a credit pack',
  })
  @ApiResponse({ status: 201, description: 'Credit pack created successfully' })
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  async create(
    @Res() res: Response,
    @Body() createCreditPackDto: CreateCreditPackDto,
  ) {
    try {
      const creditPack =
        await this.creditPackService.create(createCreditPackDto);
      return OK(
        res,
        'Credit pack created successfully',
        creditPack,
        HttpStatus.CREATED,
      );
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  @Get('all')
  @ApiOperation({
    summary: 'Get all credit packs',
    description: 'Get all credit packs, filtered by active status if provided',
  })
  @ApiResponse({ status: 200, description: 'Return all credit packs' })
  @ApiQuery({
    name: 'is_active',
    required: false,
    type: Boolean,
    description: 'Filter by active status',
  })
  async findAll(@Res() res: Response, @Query('is_active') isActive?: string) {
    try {
      const filter = isActive ? { is_active: isActive === 'true' } : {};
      const creditPacks = await this.creditPackService.findAll(filter);
      return OK(
        res,
        'Credit packs retrieved successfully',
        creditPacks,
        HttpStatus.OK,
      );
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a credit pack',
    description: 'Get a credit pack',
  })
  @ApiResponse({ status: 200, description: 'Return a credit pack' })
  async findOne(@Res() res: Response, @Param('id') id: string) {
    try {
      const creditPack = await this.creditPackService.findOne(id);
      return OK(
        res,
        'Credit pack retrieved successfully',
        creditPack,
        HttpStatus.OK,
      );
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a credit pack',
    description: 'Update a credit pack',
  })
  @ApiResponse({ status: 200, description: 'Credit pack updated successfully' })
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateCreditPackDto: UpdateCreditPackDto,
  ) {
    try {
      const updatedCreditPack = await this.creditPackService.update(
        id,
        updateCreditPackDto,
      );
      return OK(
        res,
        'Credit pack updated successfully',
        updatedCreditPack,
        HttpStatus.OK,
      );
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a credit pack',
    description: 'Delete a credit pack',
  })
  @ApiResponse({ status: 200, description: 'Credit pack deleted successfully' })
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  async remove(@Res() res: Response, @Param('id') id: string) {
    try {
      const creditPack = await this.creditPackService.remove(id);
      return OK(
        res,
        'Credit pack deleted successfully',
        creditPack,
        HttpStatus.OK,
      );
    } catch (error) {
      return errorHandler(error, res);
    }
  }
}
