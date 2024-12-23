import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyModulesController } from './study-modules.controller';
import { StudyModulesService } from './study-modules.service';
import { StudyModule } from './entities/study-module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudyModule])],
  controllers: [StudyModulesController],
  providers: [StudyModulesService],
})
export class StudyModulesModule {}
