import { Test, TestingModule } from '@nestjs/testing';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Progress } from './entities/progress.entity';
import { User } from '../users/entities/user.entity';
import { StudyModule } from '../study-modules/entities/study-module.entity';
import { Repository } from 'typeorm';

describe('ProgressController', () => {
  let controller: ProgressController;
  let service: ProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgressController],
      providers: [
        ProgressService,
        {
          provide: getRepositoryToken(Progress),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(StudyModule),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ProgressController>(ProgressController);
    service = module.get<ProgressService>(ProgressService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
