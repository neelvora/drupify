import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { Progress } from './entities/progress.entity';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  create(
    @Body()
    createProgressDto: {
      userId: string;
      moduleId: string;
      progress: number;
    },
  ): Promise<Progress> {
    const { userId, moduleId, progress } = createProgressDto;
    return this.progressService.create(userId, moduleId, progress);
  }

  @Get()
  findAll(): Promise<Progress[]> {
    return this.progressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Progress> {
    return this.progressService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProgressDto: { progress: number },
  ): Promise<Progress> {
    const { progress } = updateProgressDto;
    return this.progressService.update(id, progress);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.progressService.remove(id);
  }
}