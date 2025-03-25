import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PhotoboothModule } from './photobooth/photobooth.module';
import { WallModule } from './wall/wall.module';
import { GameModule } from './game/game.module';
import { AiBotModule } from './ai-bot/ai-bot.module';
import { RegistrationModule } from './registration/registration.module';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [
    PhotoboothModule,
    WallModule,
    GameModule,
    AiBotModule,
    RegistrationModule,
  ],
})
export class EventsModule {}
