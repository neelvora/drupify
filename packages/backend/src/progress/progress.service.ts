import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Progress } from './entities/progress.entity';
import { User } from '../users/entities/user.entity';
import { StudyModule } from '../study-modules/entities/study-module.entity';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private readonly progressRepository: Repository<Progress>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(StudyModule)
    private readonly moduleRepository: Repository<StudyModule>,
  ) {}

  async create(
    userId: string,
    moduleId: string,
    progress: number,
  ): Promise<Progress> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const module = await this.moduleRepository.findOne({ 
      where: { id: moduleId },
    });
    if (!module) {
      throw new NotFoundException(`Module with ID ${moduleId} not found`);
    }

    const newProgress = this.progressRepository.create({ 
      user,
      module,
      progress,
    });
    return this.progressRepository.save(newProgress);
  }

  findAll(): Promise<Progress[]> {
    return this.progressRepository.find({ relations: ['user', 'module'] });
  }

  async findOne(id: string): Promise<Progress> {
    const progress = await this.progressRepository.findOne({ 
      where: { id },
      relations: ['user', 'module'],
    });
    if (!progress) {
      throw new NotFoundException(`Progress with ID ${id} not found`);
    }
    return progress;
  }

  async update(id: string, progress: number): Promise<Progress> {
    const existingProgress = await this.findOne(id);
    existingProgress.progress = progress;
    return this.progressRepository.save(existingProgress);
  }

  async remove(id: string): Promise<void> {
    const progress = await this.findOne(id);
    await this.progressRepository.remove(progress);
  }
}
