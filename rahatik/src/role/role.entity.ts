import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';


@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id:number;
  @Column({unique:true})
  value:string;
  @Column()
  description:string;
  @ManyToMany(()=>User,user=>user.roles)
  @JoinTable()
  users:User[]
}