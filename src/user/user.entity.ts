import { Role } from '../role/role.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vebinar } from '../vebinar/vebinar.entity';

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

  @OneToMany(()=>Vebinar,vebinar=>vebinar.user)
  vebinars:Vebinar[]

  @ManyToMany(()=>Vebinar,vebinar=>vebinar.customers)
  bothVebinars:Vebinar[]
}