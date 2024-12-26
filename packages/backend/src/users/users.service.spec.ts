import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Progress } from '../progress/entities/progress.entity';
import { StudyModule } from '../study-modules/entities/study-module.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

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
          entities: [User, Progress, StudyModule],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User, Progress, StudyModule]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = new User();
    user.name = 'Test User';
    user.email = `unique-${uuidv4()}@example.com`;
    const savedUser = await service.create(user);
    expect(savedUser).toHaveProperty('id');
    expect(savedUser.name).toBe('Test User');
    expect(savedUser.email).toBe(user.email);
  });

  it('should throw BadRequestException when creating a user without name or email', async () => {
    await expect(service.create({})).rejects.toThrow(BadRequestException);
  });

  it('should find all users', async () => {
    const users = await service.findAll();
    expect(users).toBeInstanceOf(Array);
  });

  it('should find one user', async () => {
    const user = new User();
    user.name = 'Test User';
    user.email = `unique-${uuidv4()}@example.com`;
    const savedUser = await service.create(user);
    const foundUser = await service.findOne(savedUser.id);
    expect(foundUser).toHaveProperty('id');
    expect(foundUser.name).toBe('Test User');
    expect(foundUser.email).toBe(user.email);
  });

  it('should throw NotFoundException when finding a non-existing user', async () => {
    await expect(
      service.findOne('00000000-0000-0000-0000-000000000000'),
    ).rejects.toThrow(NotFoundException);
  });

  it('should update a user', async () => {
    const user = new User();
    user.name = 'Test User';
    user.email = `unique-${uuidv4()}@example.com`;
    const savedUser = await service.create(user);
    const updatedUser = await service.update(savedUser.id, {
      name: 'Updated User',
    });
    expect(updatedUser.name).toBe('Updated User');
  });

  it('should throw BadRequestException when updating a user with invalid email', async () => {
    const user = new User();
    user.name = 'Test User';
    user.email = `unique-${uuidv4()}@example.com`;
    const savedUser = await service.create(user);
    await expect(
      service.update(savedUser.id, { email: 'invalid-email' })
    ).rejects.toThrow(BadRequestException);
  });

  it('should remove a user', async () => {
    const user = new User();
    user.name = 'Test User';
    user.email = `unique-${uuidv4()}@example.com`;
    const savedUser = await service.create(user);
    await service.remove(savedUser.id);
    await expect(service.findOne(savedUser.id)).rejects.toThrow(
      NotFoundException,
    );
  });
});
