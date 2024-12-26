import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

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
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
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
    user.email = 'unique1@example.com';
    const savedUser = await service.create(user);
    expect(savedUser).toHaveProperty('id');
    expect(savedUser.name).toBe('Test User');
    expect(savedUser.email).toBe('unique1@example.com');
  });

  it('should find all users', async () => {
    const users = await service.findAll();
    expect(users).toBeInstanceOf(Array);
  });

  it('should find one user', async () => {
    const user = new User();
    user.name = 'Test User';
    user.email = 'unique2@example.com';
    const savedUser = await service.create(user);
    const foundUser = await service.findOne(savedUser.id);
    expect(foundUser).toHaveProperty('id');
    expect(foundUser.name).toBe('Test User');
    expect(foundUser.email).toBe('unique2@example.com');
  });

  it('should update a user', async () => {
    const user = new User();
    user.name = 'Test User';
    user.email = 'unique3@example.com';
    const savedUser = await service.create(user);
    const updatedUser = await service.update(savedUser.id, { name: 'Updated User' });
    expect(updatedUser.name).toBe('Updated User');
  });

  it('should remove a user', async () => {
    const user = new User();
    user.name = 'Test User';
    user.email = 'unique4@example.com';
    const savedUser = await service.create(user);
    await service.remove(savedUser.id);
    await expect(service.findOne(savedUser.id)).rejects.toThrow();
  });
});
