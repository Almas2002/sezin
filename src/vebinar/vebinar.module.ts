import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vebinar } from './vebinar.entity';
import { FileModule } from '../file/file.module';
import { UserModule } from '../user/user.module';
import { VebinarService } from './vebinar.service';
import { VebinarController } from './vebinar.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Vebinar]),FileModule,UserModule],
  controllers:[VebinarController],
  providers:[VebinarService]
})
export class VebinarModule{}