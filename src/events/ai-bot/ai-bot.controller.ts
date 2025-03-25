import { Controller } from '@nestjs/common';
import { AiBotService } from './ai-bot.service';

@Controller('ai-bot')
export class AiBotController {
  constructor(private readonly aiBotService: AiBotService) {}
}
