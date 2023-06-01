import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { RoleModule } from '../role/role.module';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { ProfileModule } from '../profile/profile.module';
import { UserExerciseEntity } from './user-exercise.entity';

@Module({
  controllers:[UserController],
  providers:[UserService],
  imports:[TypeOrmModule.forFeature([User,UserExerciseEntity]),forwardRef(()=>AuthModule),RoleModule,ProfileModule],
  exports:[UserService]
})
export class UserModule{}