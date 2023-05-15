import { Feeling } from './feeling.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Exercise{
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  description:string;
  @ManyToOne(()=>Feeling,feeling=>feeling,{onDelete:"CASCADE"})
  feeling:Feeling;
  @Column({name:"image_url"})
  imageUrl:string;
  @Column()
  name:string;
  @Column()
  seconds:number
}