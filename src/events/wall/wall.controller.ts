import { Controller } from '@nestjs/common';
import { WallService } from './wall.service';

@Controller('wall')
export class WallController {
  constructor(private readonly wallService: WallService) {}
}
