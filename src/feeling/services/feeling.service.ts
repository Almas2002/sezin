import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feeling } from '../entity/feeling.entity';
import { Repository } from 'typeorm';
import { CreateFeelingDto, QueryFeeling } from '../dto/feeling.dto';
import { FeelingExistsExceptions } from '../exceptions/feeling.exceptions';
import { of } from 'rxjs';

@Injectable()
export class FeelingService {
  constructor(@InjectRepository(Feeling) private feelingRepository: Repository<Feeling>) {
  }

  async create(dto: CreateFeelingDto): Promise<{ id: number }> {
    const candidate = await this.feelingRepository.findOne({ where: { name: dto.name } });
    if (candidate) {
      throw new FeelingExistsExceptions();
    }
    const feeling = await this.feelingRepository.save({ ...dto });
    return { id: feeling.id };
  }

  async getOneById(id: number): Promise<Feeling> {
    return this.feelingRepository.findOne({ where: { id } });
  }

  async getAll(dto: QueryFeeling): Promise<{ data: Feeling[], count: number }> {
    const limit = dto?.limit || 10;
    const page = dto?.page || 1;
    const offset = limit * page - limit;
    const query = this.feelingRepository.createQueryBuilder('feeling')
      .leftJoinAndSelect('feeling.videos', 'videos')
      .leftJoinAndSelect('feeling.articles', 'articles')
      .leftJoinAndSelect('feeling.exercises', 'exercises');

    query.limit(limit);
    query.offset(offset);

    const data = await query.getManyAndCount();
    return { data: data[0], count: data[1] };
  }

}