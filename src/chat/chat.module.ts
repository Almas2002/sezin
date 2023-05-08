import {Module} from '@nestjs/common';
import {ChatService} from './service/chat.service';
import {RoomService} from "./service/room/room.service";
import {MessageService} from "./service/message/message.service";
import {JointedRoomService} from "./service/joined-room/jointed-room.service";
import {ConnectedUserService} from "./service/connected-room/connected-user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Message} from "./model/message/message.entity";
import {Room} from "./model/room/room.entity";
import {ChatGateway} from "./gateway/chat.gateway";
import {AuthModule} from "../auth/auth.module";
import {UserModule} from "../user/user.module";
import {JoinedRoom} from "./model/joined-room/joined-room.entity";
import { ConnectedUser } from './model/connected-room/connected.user.entity';
import { ChatController } from './chat.controller';

@Module({
    controllers: [ChatController],
    providers:
        [
            ChatService,
            RoomService,
            MessageService,
            JointedRoomService,
            ConnectedUserService,
            ChatGateway,
        ],
    imports:[
        TypeOrmModule.forFeature([Message,Room,ConnectedUser,JoinedRoom]),AuthModule,UserModule
    ],
    exports:[]
})
export class ChatModule {
}
