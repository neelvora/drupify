import { Test, TestingModule } from '@nestjs/testing';
import { StudyModulesService } from './study-modules.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StudyModule } from './entities/study-module.entity';

describe('StudyModulesService', () => {
  let service: StudyModulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudyModulesService,
        {
          provide: getRepositoryToken(StudyModule),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StudyModulesService>(StudyModulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
