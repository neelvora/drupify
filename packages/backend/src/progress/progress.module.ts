import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { Progress } from './entities/progress.entity';
import { User } from '../users/entities/user.entity';
import { StudyModule } from '../study-modules/entities/study-module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Progress, User, StudyModule])],
  providers: [ProgressService],
  controllers: [ProgressController],
})
export class ProgressModule {}
