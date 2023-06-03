import {User} from "../../../user/user.entity";
import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Room} from "../room/room.entity";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    text: string;
    @ManyToOne(() => User, user => user, {nullable: false,onDelete:"CASCADE"})
    user: User;
    @ManyToOne(() => Room, room => room.messages, {nullable: false})
    room: Room
    @CreateDateColumn()
    createAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}