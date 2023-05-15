import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Feeling } from './feeling.entity';

@Entity()
export class Article{
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  description:string;
  @ManyToOne(()=>Feeling,feeling=>feeling,{onDelete:"CASCADE"})
  feeling:Feeling;
  @Column()
  title:string;
}