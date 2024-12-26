import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Progress } from '../../progress/entities/progress.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Progress, (progress) => progress.user)
  progress: Progress[];
}
