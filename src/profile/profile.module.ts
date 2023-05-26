import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { FileModule } from '../file/file.module';

import { AuthModule } from '../auth/auth.module';

@Module({
  exports:[ProfileService],
  providers:[ProfileService],
  controllers:[ProfileController],
  imports:[TypeOrmModule.forFeature([Profile]),FileModule,AuthModule]
})
export class ProfileModule{

}