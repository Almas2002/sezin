import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ArticleService } from '../services/article.service';
import { CreateArticle } from '../dto/article.dto';
import { RoleGuards } from '../../auth/guard/role.guard';
import { Role } from '../../decorators/role.decorator';

@Controller('article')
export class ArticleController {
  constructor(private articleService:ArticleService) {}

  @Role("ADMIN")
  @UseGuards(RoleGuards)
  @Post()
  create(@Body()dto:CreateArticle){
    return this.articleService.create(dto)
  }
  @Get()
  getArticle(){
    return this.articleService.getAll()
  }

}