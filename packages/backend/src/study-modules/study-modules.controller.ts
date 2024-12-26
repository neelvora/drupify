import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { StudyModulesService } from './study-modules.service';
import { StudyModule } from './entities/study-module.entity';

@Controller('study-modules')
export class StudyModulesController {
  constructor(private readonly studyModulesService: StudyModulesService) {}

  @Post()
  create(
    @Body() createStudyModuleDto: Partial<StudyModule>,
  ): Promise<StudyModule> {
    return this.studyModulesService.create(createStudyModuleDto);
  }

  @Get()
  findAll(): Promise<StudyModule[]> {
    return this.studyModulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<StudyModule> {
    return this.studyModulesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudyModuleDto: Partial<StudyModule>,
  ): Promise<StudyModule> {
    return this.studyModulesService.update(id, updateStudyModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.studyModulesService.remove(id);
  }
}
