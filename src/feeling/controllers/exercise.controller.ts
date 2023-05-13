import { Body, Controller, Delete, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ExerciseService } from '../services/exercise.service';
import { CreateExercise } from '../dto/exercise.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from '../../decorators/role.decorator';
import { createEvalAwarePartialHost } from 'ts-node/dist/repl';

@Controller('exercise')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {
  }

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(@Body()dto: CreateExercise, @UploadedFile()file) {
    return this.exerciseService.create(dto, file);
  }
  @Delete(':id')
  deleteExercise(@Param('id')id:number){
    return this.exerciseService.delete(id)
  }

}