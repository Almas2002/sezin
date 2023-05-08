import { FeelingService } from '../services/feeling.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateFeelingDto, QueryFeeling } from '../dto/feeling.dto';
import { Role } from '../../decorators/role.decorator';

@Controller('feeling')
export class FeelingController {
  constructor(private feelingService: FeelingService) {
  }

  @Role("ADMIN")
  @Post()
  async create(@Body()dto: CreateFeelingDto) {
    return this.feelingService.create(dto);
  }

  @Get()
  async getAll(@Query()query: QueryFeeling) {
    return this.feelingService.getAll(query);
  }
}