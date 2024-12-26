import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { StudyModule } from '../../study-modules/entities/study-module.entity';

@Entity()
export class Progress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.progress)
  user: User;

  @ManyToOne(() => StudyModule, (module) => module.progress)
  module: StudyModule;

  @Column()
  progress: number;
}
