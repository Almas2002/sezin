import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';


@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({nullable:true})
  photo: string;
  @Column({nullable:true})
  phone: string;
  @Column({nullable:true})
  smallDesc: string;
  @Column({nullable:true})
  desc: string;
  @OneToOne(()=>User,user=>user.profile,{onDelete:"CASCADE"})
  @JoinColumn({name:"user_id"})
  user:User
}