import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudyModule } from './entities/study-module.entity';

@Injectable()
export class StudyModulesService {
  constructor(
    @InjectRepository(StudyModule)
    private readonly studyModuleRepository: Repository<StudyModule>,
  ) {}

  async create(studyModule: Partial<StudyModule>): Promise<StudyModule> {
    const newModule = this.studyModuleRepository.create(studyModule);
    return this.studyModuleRepository.save(newModule);
  }

  findAll(): Promise<StudyModule[]> {
    return this.studyModuleRepository.find();
  }

  async findOne(id: string): Promise<StudyModule> {
    const module = await this.studyModuleRepository.findOne({ where: { id } });
    if (!module) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }
    return module;
  }

  async update(
    id: string,
    updateStudyModule: Partial<StudyModule>,
  ): Promise<StudyModule> {
    const module = await this.findOne(id);
    Object.assign(module, updateStudyModule);
    return this.studyModuleRepository.save(module);
  }

  async remove(id: string): Promise<void> {
    const module = await this.findOne(id);
    await this.studyModuleRepository.remove(module);
  }
}
