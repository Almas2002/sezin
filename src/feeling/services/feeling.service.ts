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
    const query = this.feelingRepository.createQueryBuilder('feeling')
      .leftJoinAndSelect('feeling.videos', 'videos')
      .leftJoinAndSelect('feeling.articles', 'articles')
      .leftJoinAndSelect('feeling.exercises', 'exercises')
      .orderBy("feeling.id","DESC");
    if(dto?.score){
      query.andWhere("feeling.score = :score",{score:dto.score})
    }


    const data = await query.getManyAndCount();
    return { data: data[0], count: data[1] };
  }

}