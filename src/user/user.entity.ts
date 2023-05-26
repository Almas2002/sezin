import { Role } from '../role/role.entity';
import { Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Vebinar } from '../vebinar/vebinar.entity';
import { Profile } from '../profile/profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column({default:""})
  fullName:string;
  @Column({ select: false })
  password: string;
  @Column({default:0})
  score:number
  @ManyToMany(() => Role, role => role.users)
  roles: Role[];

  @Column({default:false})
  isSubscriber:boolean

  @OneToMany(()=>Vebinar,vebinar=>vebinar.user,{onDelete:"CASCADE"})
  vebinars:Vebinar[]

  @ManyToMany(()=>Vebinar,vebinar=>vebinar.customers,{onDelete:"CASCADE"})
  bothVebinars:Vebinar[]

  @OneToOne(()=>Profile)
  profile:Profile
}