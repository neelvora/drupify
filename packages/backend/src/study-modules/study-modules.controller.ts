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
import { CreateStudyModuleDto } from './dto/create-study-module.dto';
import { UpdateStudyModuleDto } from './dto/update-study-module.dto';

@Controller('study-modules')
export class StudyModulesController {
  constructor(private readonly studyModulesService: StudyModulesService) {}

  @Post()
  create(@Body() createStudyModuleDto: CreateStudyModuleDto) {
    return this.studyModulesService.create(createStudyModuleDto);
  }

  @Get()
  findAll() {
    return this.studyModulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.studyModulesService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateStudyModuleDto: UpdateStudyModuleDto,
  ) {
    return this.studyModulesService.update(+id, updateStudyModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.studyModulesService.remove(+id);
  }
}