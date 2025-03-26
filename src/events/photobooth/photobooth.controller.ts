import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { PhotoboothService } from './photobooth.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response } from 'express';
import { errorHandler, OK } from 'src/response/response.util';
import { CreatePhotoboothDto } from './dto/photobooth.dto';
import { GeneratePhotoDto } from './model/photobooth.model';

@ApiTags('PhotoBooth')
@Controller('photobooth')
export class PhotoboothController {
  constructor(private readonly photoboothService: PhotoboothService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new photo booth' })
  @ApiResponse({
    status: 201,
    description: 'The photo booth has been successfully created',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async createEvent(
    @Req() req,
    @Body() body: CreatePhotoboothDto,
    @Res() res: Response,
  ) {
    try {
      const userId = req.user._id;
      const { name } = body;
      const event = await this.photoboothService.createEvent(userId, name);
      return OK(res, 'Event created successfully', event, 201);
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  @Post('generate')
  @ApiOperation({ summary: 'Generate a photo' })
  @ApiResponse({ status: 201, description: 'The photo has been generated' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async generate(
    @Res() res: Response,
    @Req() req,
    @Body() body: GeneratePhotoDto,
  ) {
    try {
      const userId = req.user._id;
      const { eventId } = body;
      const data = await this.photoboothService.generate(userId, eventId);
      return OK(res, 'Photo generated successfully', data, 201);
    } catch (error) {
      return errorHandler(error, res);
    }
  }
}
