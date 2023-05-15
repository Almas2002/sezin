import { Feeling } from './feeling.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Video{
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  description:string;
  @ManyToOne(()=>Feeling,feeling=>feeling,{onDelete:"CASCADE"})
  feeling:Feeling;
  @Column({name:"video_url"})
  videoUrl:string;
  @Column()
  title:string;
}