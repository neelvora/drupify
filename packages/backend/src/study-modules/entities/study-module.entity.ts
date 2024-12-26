import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Progress } from '../../progress/entities/progress.entity';

@Entity()
export class StudyModule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Progress, (progress) => progress.module)
  progress: Progress[];
}
