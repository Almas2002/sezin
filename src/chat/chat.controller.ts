import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { MessageService } from './service/message/message.service';
import { PageI } from './model/page.interface';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UserDecorator } from '../decorators/user.decorator';
import { RoomService } from './service/room/room.service';
import { User } from '../user/user.entity';
import { log } from 'util';

@Controller('chat')
export class ChatController{
  constructor(private messageService:MessageService,private roomService:RoomService) {}

  @UseGuards(AuthGuard)
  @Get("room")
  getRooms(@UserDecorator('id')id:number){
    return this.roomService.getRoomsForUser(id)
  }

  @Get("/:id")
  getMessage(@Param('id')id:number,@Query()query:PageI){
    return this.messageService.getAllMessage(id,query)
  }


  @UseGuards(AuthGuard)
  @Post('room')
  createRoom(@UserDecorator()creator: User,@Body('id')userId:number){
    let body = {...creator}
    body.id = userId
    console.log(body);
    return this.roomService.createRoom(creator,body)
  }

}