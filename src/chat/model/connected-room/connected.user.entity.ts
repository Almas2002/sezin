import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { User } from '../../../user/user.entity';


@Entity('connected_user')
export class ConnectedUser {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User, user => user,{onDelete:"CASCADE"})
    user: User;
    @Column()
    socketId: string;
}