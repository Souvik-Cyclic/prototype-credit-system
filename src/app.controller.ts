import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Server Status')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Check if the server is alive' })
  @ApiResponse({ status: 200, description: 'Alive' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
