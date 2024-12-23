import { Test, TestingModule } from '@nestjs/testing';
import { StudyModulesController } from './study-modules.controller';
import { StudyModulesService } from './study-modules.service';

describe('StudyModulesController', () => {
  let controller: StudyModulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyModulesController],
      providers: [
        {
          provide: StudyModulesService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StudyModulesController>(StudyModulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
