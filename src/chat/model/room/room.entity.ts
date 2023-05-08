import {User} from "../../../user/user.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {Message} from "../message/message.entity";
import {JoinedRoom} from "../joined-room/joined-room.entity";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => User, user => user)
    @JoinTable()
    users: User[];

    @OneToMany(()=>Message,message=>message.room)
    messages:Message[]

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(()=>JoinedRoom,joinedRoom=>joinedRoom.room)
    joinedUsers:JoinedRoom[]

    @Column({default:0})
    combination:number
}