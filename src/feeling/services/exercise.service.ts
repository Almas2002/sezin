import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from '../entity/exercise.entity';
import { Repository } from 'typeorm';
import { CreateExercise } from '../dto/exercise.dto';
import { FeelingService } from './feeling.service';
import { FeelingNotFoundExceptions } from '../exceptions/feeling.exceptions';
import { FileService } from '../../file/file.service';

@Injectable()
export class ExerciseService {
  constructor(@InjectRepository(Exercise) private exerciseRepository: Repository<Exercise>, private feelingService: FeelingService, private fileService: FileService) {
  }

  async create(dto: CreateExercise, image: any): Promise<{ id: number }> {
    const feeling = await this.feelingService.getOneById(dto.feelingId);
    if (!feeling) {
      throw new FeelingNotFoundExceptions();
    }
    const imageUrl = await this.fileService.createFile(image);
    const article = await this.exerciseRepository.save({ feeling, imageUrl, ...dto });
    return { id: article.id };
  }



}