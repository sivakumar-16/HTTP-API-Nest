import { Controller, Get } from '@nestjs/common';
import { FestivalsService } from './festivals.service';

@Controller('festivals')
export class FestivalsController {
  constructor(private readonly festivalsService: FestivalsService) {}

  @Get()
  async getFestivals(): Promise<any> {
    return this.festivalsService.getFestivalsData();
  }
}
