import {User} from "../../../user/user.entity";
import {Message} from "../message/message.entity";

export interface RoomI {
    id?: number;
    users?: User[];
    created_at?: Date;
    updated_at?: Date;
    messages:Message[]
}
