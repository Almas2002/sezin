import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ChatService } from './service/chat.service';
import { MessageService } from './service/message/message.service';
import { PageI } from './model/page.interface';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UserDecorator } from '../decorators/user.decorator';
import { RoomService } from './service/room/room.service';
import { User } from '../user/user.entity';

@Controller('chat')
export class ChatController{
  constructor(private messageService:MessageService,private roomService:RoomService) {}

  @Get("/:id")
  getMessage(@Param('id')id:number,@Query()query:PageI){
    return this.messageService.getAllMessage(id,query)
  }

  @UseGuards(AuthGuard)
  @Get("room")
  getRooms(@UserDecorator('id')id:number){
    return this.roomService.getRoomsForUser(id)
  }
  @UseGuards(AuthGuard)
  @Post('room')
  createRoom(@UserDecorator()creator: User,@Body('id')userId:number){
    return this.roomService.createRoom(creator,{id:userId,...creator})
  }

}