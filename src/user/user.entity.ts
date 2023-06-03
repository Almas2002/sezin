import { Role } from '../role/role.entity';
import { Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Vebinar } from '../vebinar/vebinar.entity';
import { Profile } from '../profile/profile.entity';
import { ExerciseStatus, UserExerciseEntity } from './user-exercise.entity';
import { Exercise } from '../feeling/entity/exercise.entity';
import { Auth } from '../auth/auth.entity';
import { Message } from '../chat/model/message/message.entity';
import { ConnectedUser } from '../chat/model/connected-room/connected.user.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column({ default: '' })
  fullName: string;
  @Column({ select: false })
  password: string;
  @Column({ default: 0 })
  score: number;
  @ManyToMany(() => Role, role => role.users,{onDelete:"CASCADE"})
  roles: Role[];

  @Column({ default: false })
  isSubscriber: boolean;

  @OneToMany(() => Vebinar, vebinar => vebinar.user, { onDelete: 'CASCADE' })
  vebinars: Vebinar[];

  @ManyToMany(() => Vebinar, vebinar => vebinar.customers, { onDelete: 'CASCADE' })
  bothVebinars: Vebinar[];

  @OneToOne(() => Profile, profile => profile.user,{onDelete:"CASCADE"})
  profile: Profile;

  @OneToMany(()=>UserExerciseEntity,exercise=>exercise.exercise,{onDelete:"CASCADE"})
  exercises:UserExerciseEntity[]

  @OneToMany(()=>Message,message=>message.user,{onDelete:"CASCADE"})
  messages:Message[]
  @OneToOne(()=>Auth,auth=>auth.user,{onDelete:"CASCADE"})
  auth:Auth

  @OneToMany(()=>ConnectedUser,user=>user.user,{onDelete:"CASCADE"})
  connected:ConnectedUser
}