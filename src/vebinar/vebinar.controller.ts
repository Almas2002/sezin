import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { VebinarService } from './vebinar.service';
import { CreateVebinarDto } from './vebinar.dto';
import { UserDecorator } from '../decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('vebinar')
export class VebinarController {
  constructor(private vebinarService: VebinarService) {
  }

  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body()dto: CreateVebinarDto, @UserDecorator('id')id: number, @UploadedFile()file) {
    return this.vebinarService.create(dto, file, id);
  }

  @Get()
  async getAll(){
    return this.vebinarService.getAll()
  }
  @UseGuards(AuthGuard)
  @Put(":id")
  buy(@Param('id')id:number,@UserDecorator('id')userId: number,){
    return this.vebinarService.buy(id,userId)
  }
}