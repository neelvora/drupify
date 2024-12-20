import { Injectable } from '@nestjs/common';
import { helloWorld } from '@drupify/shared';

@Injectable()
export class GamificationService {
  getHello(): string {
    return helloWorld();
  }
}
