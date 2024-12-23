import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudyModule } from './entities/study-module.entity';
import { CreateStudyModuleDto } from './dto/create-study-module.dto';
import { UpdateStudyModuleDto } from './dto/update-study-module.dto';

@Injectable()
export class StudyModulesService {
  constructor(
    @InjectRepository(StudyModule)
    private readonly studyModuleRepository: Repository<StudyModule>,
  ) {}

  async create(createStudyModuleDto: CreateStudyModuleDto) {
    const newModule = this.studyModuleRepository.create(createStudyModuleDto);
    return this.studyModuleRepository.save(newModule);
  }

  findAll() {
    return this.studyModuleRepository.find();
  }

  async findOne(id: number) {
    const module = await this.studyModuleRepository.findOne({ where: { id } });
    if (!module) {
      throw new NotFoundException(`Study module with ID ${id} not found`);
    }
    return module;
  }

  async update(id: number, updateStudyModuleDto: UpdateStudyModuleDto) {
    const module = await this.findOne(id);
    Object.assign(module, updateStudyModuleDto);
    return this.studyModuleRepository.save(module);
  }

  async remove(id: number) {
    const module = await this.findOne(id);
    return this.studyModuleRepository.remove(module);
  }
}