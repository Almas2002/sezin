import { Role } from '../role/role.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  phone: string;
  @Column({ select: false })
  password: string;
  @ManyToMany(() => Role, role => role.users)
  roles: Role[];
}