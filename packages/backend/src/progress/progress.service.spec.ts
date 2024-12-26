import { Test, TestingModule } from '@nestjs/testing';
import { ProgressService } from './progress.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Progress } from './entities/progress.entity';
import { User } from '../users/entities/user.entity';
import { StudyModule } from '../study-modules/entities/study-module.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

describe('ProgressService', () => {
  let service: ProgressService;
  let progressRepository: Repository<Progress>;
  let userRepository: Repository<User>;
  let moduleRepository: Repository<StudyModule>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'neelvora',
          password: '',
          database: 'drupify',
          entities: [Progress, User, StudyModule],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Progress, User, StudyModule]),
      ],
      providers: [ProgressService],
    }).compile();

    service = module.get<ProgressService>(ProgressService);
    progressRepository = module.get<Repository<Progress>>(
      getRepositoryToken(Progress),
    );
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    moduleRepository = module.get<Repository<StudyModule>>(
      getRepositoryToken(StudyModule),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a progress record', async () => {
    const user = new User();
    user.name = 'Test User';
    user.email = `unique-${uuidv4()}@example.com`;
    const savedUser = await userRepository.save(user);

    const module = new StudyModule();
    module.name = 'Test Module';
    module.description = 'Test Description';
    const savedModule = await moduleRepository.save(module);

    const progress = await service.create(savedUser.id, savedModule.id, 50);
    expect(progress).toHaveProperty('id');
    expect(progress.user.id).toBe(savedUser.id);
    expect(progress.module.id).toBe(savedModule.id);
    expect(progress.progress).toBe(50);
  });

  it('should find all progress records', async () => {
    const progressRecords = await service.findAll();
    expect(progressRecords).toBeInstanceOf(Array);
  });

  it('should find one progress record', async () => {
    const user = new User();
    user.name = 'Test User';
    user.email = `unique-${uuidv4()}@example.com`;
    const savedUser = await userRepository.save(user);

    const module = new StudyModule();
    module.name = 'Test Module';
    module.description = 'Test Description';
    const savedModule = await moduleRepository.save(module);

    const progress = new Progress();
    progress.user = savedUser;
    progress.module = savedModule;
    progress.progress = 50;
    const savedProgress = await progressRepository.save(progress);

    const foundProgress = await service.findOne(savedProgress.id);
    expect(foundProgress).toHaveProperty('id');
    expect(foundProgress.user.id).toBe(savedUser.id);
    expect(foundProgress.module.id).toBe(savedModule.id);
    expect(foundProgress.progress).toBe(50);
  });

  it('should throw NotFoundException when finding a non-existing progress record', async () => {
    await expect(
      service.findOne('00000000-0000-0000-0000-000000000000'),
    ).rejects.toThrow(NotFoundException);
  });

  it('should update a progress record', async () => {
    const user = new User();
    user.name = 'Test User';
    user.email = `unique-${uuidv4()}@example.com`;
    const savedUser = await userRepository.save(user);

    const module = new StudyModule();
    module.name = 'Test Module';
    module.description = 'Test Description';
    const savedModule = await moduleRepository.save(module);

    const progress = new Progress();
    progress.user = savedUser;
    progress.module = savedModule;
    progress.progress = 50;
    const savedProgress = await progressRepository.save(progress);

    const updatedProgress = await service.update(savedProgress.id, 75);
    expect(updatedProgress.progress).toBe(75);
  });

  it('should remove a progress record', async () => {
    const user = new User();
    user.name = 'Test User';
    user.email = `unique-${uuidv4()}@example.com`;
    const savedUser = await userRepository.save(user);

    const module = new StudyModule();
    module.name = 'Test Module';
    module.description = 'Test Description';
    const savedModule = await moduleRepository.save(module);

    const progress = new Progress();
    progress.user = savedUser;
    progress.module = savedModule;
    progress.progress = 50;
    const savedProgress = await progressRepository.save(progress);

    await service.remove(savedProgress.id);
    await expect(service.findOne(savedProgress.id)).rejects.toThrow(
      NotFoundException,
    );
  });
});
