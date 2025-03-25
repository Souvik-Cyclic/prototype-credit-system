import { Controller } from '@nestjs/common';
import { PhotoboothService } from './photobooth.service';

@Controller('photobooth')
export class PhotoboothController {
  constructor(private readonly photoboothService: PhotoboothService) {}
}
