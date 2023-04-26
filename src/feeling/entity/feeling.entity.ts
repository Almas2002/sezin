import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Video } from './video.entity';
import { Article } from './article.entity';
import { Exercise } from './exercise.entity';

@Entity()
export class Feeling{
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  name:string;
  @Column()
  score:number;

  @OneToMany(()=>Video,video=>video.feeling)
  videos:Video[]
  @OneToMany(()=>Article,article=>article.feeling)
  articles: Article[]
  @OneToMany(()=>Exercise,exercise=>exercise.feeling)
  exercises:Exercise[]
}