import { Body, Controller, Post } from '@nestjs/common';
import { ArticleService } from '../services/article.service';
import { CreateArticle } from '../dto/article.dto';

@Controller('article')
export class ArticleController {
  constructor(private articleService:ArticleService) {}


  @Post()
  create(@Body()dto:CreateArticle){
    return this.articleService.create(dto)
  }
}