import { Module } from '@nestjs/common';
import { FestivalsService } from './festivals.service';
import { FestivalsController } from './festivals.controller';

@Module({
  imports: [],
  controllers: [FestivalsController],
  providers: [FestivalsService],
})
export class FestivalsModule {}
