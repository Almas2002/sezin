import { Body, Controller, Get, Post } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackDto } from './feedback.dto';

@Controller('feedback')
export class FeedbackController{
  constructor(private feedbackService:FeedbackService) {}


  @Post()
  create(@Body()dto:FeedbackDto){
    return this.feedbackService.create(dto)
  }

  @Get()
  get(){
    return this.feedbackService.getAll()
  }
}