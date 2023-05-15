import {
  Body,
  Controller, Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { VebinarService } from './vebinar.service';
import { CreateVebinarDto } from './vebinar.dto';
import { UserDecorator } from '../decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RoleGuards } from '../auth/guard/role.guard';
import { Role } from '../decorators/role.decorator';

@Controller('vebinar')
export class VebinarController {
  constructor(private vebinarService: VebinarService) {
  }

  @Role('MANAGER')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(RoleGuards)
  @Post()
  async create(@Body()dto: CreateVebinarDto, @UserDecorator('id')id: number, @UploadedFile()file) {
    return this.vebinarService.create(dto, file, id);
  }

  @Get()
  async getAll(@Query('authorId')id: number) {
    return this.vebinarService.getAll(id);
  }

  @Role('MANAGER')
  @UseGuards(RoleGuards)
  @Put(':id')
  buy(@Param('id')id: number, @UserDecorator('id')userId: number) {
    return this.vebinarService.buy(id, userId);
  }
  @Delete(':id')
  delete(@Param('id')id:number){

  }
}