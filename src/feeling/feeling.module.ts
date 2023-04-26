import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entity/video.entity';
import { Article } from './entity/article.entity';
import { ExerciseService } from './services/exercise.service';
import { Exercise } from './entity/exercise.entity';
import { Feeling } from './entity/feeling.entity';
import { FileModule } from '../file/file.module';
import { ArticleController } from './controllers/article.controller';
import { VideoController } from './controllers/video.controller';
import { ExerciseController } from './controllers/exercise.controller';
import { FeelingController } from './controllers/feeling.controller';
import { ArticleService } from './services/article.service';
import { FeelingService } from './services/feeling.service';
import { VideoService } from './services/video.service';

@Module({
  imports:[TypeOrmModule.forFeature([Video,Article,Exercise,Feeling]),FileModule],
  controllers:[ArticleController,VideoController,ExerciseController,FeelingController],
  providers:[ArticleService,ExerciseService,FeelingService,VideoService]
})
export class FeelingModule{

}