import { VideoService } from '../services/video.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateVideo, CreateVideoDto } from '../dto/video.dto';
import { Role } from '../../decorators/role.decorator';

@Controller('video')
export class VideoController {
  constructor(private videoService: VideoService) {
  }

  @Role("ADMIN")
  @Post()
  async create(@Body()dto: CreateVideo) {
    return this.videoService.create(dto);
  }
}