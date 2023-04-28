import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Vebinar{
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  title:string;
  @ManyToOne(()=>User,user=>user)
  user:User;
  @Column()
  image:string;

  @ManyToMany(()=>User,user=>user.bothVebinars)
  @JoinTable()
  customers:User[]
}