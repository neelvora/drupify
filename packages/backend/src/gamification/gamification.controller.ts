import { Controller, Get } from '@nestjs/common';
import { GamificationService } from './gamification.service';

@Controller('gamification')
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Get('test')
  testEndpoint() {
    return { message: this.gamificationService.getHello() };
  }
}
