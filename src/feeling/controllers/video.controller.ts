import { VideoService } from '../services/video.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateVideo, CreateVideoDto } from '../dto/video.dto';

@Controller('video')
export class VideoController {
  constructor(private videoService: VideoService) {
  }

  @Post()
  async create(@Body()dto: CreateVideo) {
    return this.videoService.create(dto);
  }
}