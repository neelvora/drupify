import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('GamificationController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/gamification/streaks (GET)', () => {
    return request(app.getHttpServer())
      .get('/gamification/streaks')
      .expect(200);
  });

  it('/gamification/streaks (POST)', () => {
    return request(app.getHttpServer())
      .post('/gamification/streaks')
      .send({ /* data */ })
      .expect(201);
  });

  // Add more tests for other endpoints
});
