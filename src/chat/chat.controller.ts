import { Controller, Get, Param, Query } from '@nestjs/common';
import { ChatService } from './service/chat.service';
import { MessageService } from './service/message/message.service';
import { PageI } from './model/page.interface';

@Controller('chat')
export class ChatController{
  constructor(private messageService:MessageService) {}

  @Get("/:id")
  getMessage(@Param('id')id:number,@Query()query:PageI){
    return this.messageService.getAllMessage(id,query)
  }
}