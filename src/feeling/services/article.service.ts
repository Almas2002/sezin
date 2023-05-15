import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../entity/article.entity';
import { Repository } from 'typeorm';
import { CreateArticle } from '../dto/article.dto';
import { FeelingService } from './feeling.service';
import { FeelingNotFoundExceptions } from '../exceptions/feeling.exceptions';

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(Article) private articleRepository: Repository<Article>, private feelingService: FeelingService) {
  }

  async create(dto: CreateArticle): Promise<{ id: number }> {
    const feeling = await this.feelingService.getOneById(dto.feelingId);
    if (!feeling) {
      throw new FeelingNotFoundExceptions();
    }
    const article = await this.articleRepository.save({ feeling, ...dto });
    return { id: article.id };
  }

  async getAll() {
    return this.articleRepository.find();
  }

  async delete(id: number) {
    await this.articleRepository.delete({ id });
  }
}