import {
  OnGatewayConnection, OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { ConnectedUserService } from '../service/connected-room/connected-user.service';
import { RoomService } from '../service/room/room.service';
import { User } from '../../user/user.entity';
import { UserService } from '../../user/user.service';
import { Room } from '../model/room/room.entity';
import { MessageI } from '../model/message/message.interface';
import { Message } from '../model/message/message.entity';
import { MessageService } from '../service/message/message.service';
import { JoinedRoom } from '../model/joined-room/joined-room.entity';
import { JointedRoomService } from '../service/joined-room/jointed-room.service';
import { PageI } from '../model/page.interface';

@WebSocketGateway({ namespace: '/',cors:true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  constructor(private connectedUserService: ConnectedUserService
    , private roomService: RoomService, private userService: UserService, private messageService: MessageService,
              private jointedRoomService: JointedRoomService) {

  }

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket, data: any) {
    let token;
    if (!socket.handshake.query.token) {
      return null;
    }
    try {
      token = verify(`${socket.handshake.query.token}`, 'secret');
      socket.data.user = token;
      await this.connectedUserService.createConnectedUser({ socketId: socket.id, userId: token.id });
      const rooms = await this.roomService.getRoomsForUser(token.id);
      return this.server.to(socket.id).emit('rooms', rooms);
    } catch (e) {
      console.log(e);
      return this.disconnect(socket);
    }
  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException('вы не зарегестрированы'));
    socket.disconnect();
  }

  @SubscribeMessage('create-room')
  async createRoom(socket: Socket, data) {
    try {
      const creator: User = await this.userService.findUserById(socket.data.user.id);
      const user = await this.userService.getUserByEmail(data.email);
      const createdRoom = await this.roomService.createRoom(creator, user);
      for (const user of createdRoom.users) {
        const connectionUsers = await this.connectedUserService.findByUser(user);
        const rooms = await this.roomService.getRoomsForUser(user.id);
        for (const connection of connectionUsers) {
          this.server.to(connection.socketId).emit('rooms', rooms);
        }
      }
    }catch (e){
      console.log(e);
    }
  }

  @SubscribeMessage('add-message')
  async addMessage(socket: Socket, data: MessageI) {
    const createdMessage: Message = await this.messageService.createMessage({
      ...data,
      userId: socket.data.user.id,
    });
    const room: Room = await this.roomService.getRoom(createdMessage.room.id);
    const joinedUsers: JoinedRoom [] = await this.jointedRoomService.findByRoom(room);
    for (const user of joinedUsers) {
      await this.server.to(user.socketId).emit('messageAdded', createdMessage);
    }
  }

  @SubscribeMessage('join-room')
  async joinRoom(socket: Socket, id: { data: number }) {
    console.log(id);
    const messages = await this.messageService.getAllMessage(id.data, { limit: 10, offset: 0 });
    await this.jointedRoomService.create({ socketId: socket.id, roomId: id.data, user: socket.data.user });
    await this.server.to(socket.id).emit('messages', messages);
  }

  async handleDisconnect(client: Socket): Promise<void> {
    await this.connectedUserService.deleteBySocketId(client.id);

  }

  @SubscribeMessage('leaveRoom')
  async leaveRoom(socket: Socket, roomId: number) {
    await this.jointedRoomService.deleteJoinedUser(socket.id, roomId);
  }

  @SubscribeMessage('paginateRooms')
  async getPagination(socket: Socket, page: PageI) {
    const rooms = await this.roomService.getRoomsForUser(socket.data.user);
    return this.server.to(socket.id).emit('rooms', rooms);
  }

  async onModuleInit(): Promise<void> {
    await this.connectedUserService.deleteAll();
    await this.jointedRoomService.deleteAll();
  }
}