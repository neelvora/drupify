import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamificationModule } from './gamification/gamification.module';
import { StudyModulesModule } from './study-modules/study-modules.module';
import { StudyModule } from './study-modules/entities/study-module.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'neelvora',
      password: '',
      database: 'drupify',
      entities: [StudyModule],
      synchronize: true, // Auto-sync schema in development (disable in production)
      logging: true, // Enables query logging
    }),
    GamificationModule,
    StudyModulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
