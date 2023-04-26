import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from '../entity/video.entity';
import { Repository } from 'typeorm';
import { CreateVideo } from '../dto/video.dto';
import { FeelingService } from './feeling.service';
import { FeelingNotFoundExceptions } from '../exceptions/feeling.exceptions';

@Injectable()
export class VideoService {
  constructor(@InjectRepository(Video) private videoRepository: Repository<Video>, private feelingService: FeelingService) {
  }

  async create(dto: CreateVideo): Promise<{ id: number }> {
    const feeling = await this.feelingService.getOneById(dto.feelingId);
    if (!feeling) {
      throw new FeelingNotFoundExceptions();
    }
    const video = await this.videoRepository.save({ feeling,...dto });
    return { id: video.id };
  }
}