import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Feedback } from './feedback.entity';
import { Repository } from 'typeorm';
import { FeedbackDto } from './feedback.dto';

@Injectable()
export class FeedbackService{
  constructor(@InjectRepository(Feedback) private feedbackRepository:Repository<Feedback>) {}

  async create(dto:FeedbackDto){
    const feedback = await this.feedbackRepository.save({...dto})
    return {id:feedback.id}
  }

  async getAll(){
    return this.feedbackRepository.find()
  }
}