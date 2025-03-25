import { Module } from '@nestjs/common';
import { PhotoboothService } from './photobooth.service';
import { PhotoboothController } from './photobooth.controller';

@Module({
  controllers: [PhotoboothController],
  providers: [PhotoboothService],
})
export class PhotoboothModule {}
