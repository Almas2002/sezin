import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ExerciseService } from '../services/exercise.service';
import { CreateExercise } from '../dto/exercise.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from '../../decorators/role.decorator';

@Controller('exercise')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {
  }

  @Role("ADMIN")
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(@Body()dto: CreateExercise, @UploadedFile()file) {
    return this.exerciseService.create(dto, file);
  }
}