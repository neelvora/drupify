import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamificationModule } from './gamification/gamification.module';
import { StudyModulesModule } from './study-modules/study-modules.module';
import { UsersModule } from './users/users.module';
import { ProgressModule } from './progress/progress.module';
import { User } from './users/entities/user.entity';
import { StudyModule } from './study-modules/entities/study-module.entity';
import { Progress } from './progress/entities/progress.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'neelvora',
      password: '',
      database: 'drupify',
      entities: [User, StudyModule, Progress],
      synchronize: true,
      logging: true,
    }),
    GamificationModule,
    StudyModulesModule,
    UsersModule,
    ProgressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
