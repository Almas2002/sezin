import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exercise } from '../feeling/entity/exercise.entity';
import { User } from './user.entity';

export enum ExerciseStatus {
  DEFAULT = 'default',
  ISPROCESSING = 'isProcessing',
  END = 'end'
}

@Entity()
export class UserExerciseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(()=>Exercise,exercise=>exercise,{onDelete:"CASCADE"})
  exercise: Exercise;
  @ManyToOne(()=>User,user=>user,{onDelete:"CASCADE"})
  user: User;
  @Column({type:'enum',enum:ExerciseStatus,default:ExerciseStatus.DEFAULT})
  status: ExerciseStatus
}