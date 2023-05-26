import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ProfileService } from './profile.service';
import { UserDecorator } from '../decorators/user.decorator';
import { RoleGuards } from '../auth/guard/role.guard';
import { Role } from '../decorators/role.decorator';
import { CreateProfileDto } from './profile.dto';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}


  @Role('MANAGER')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Put()
  create(@Body()dto: CreateProfileDto, @UploadedFile()file, @UserDecorator('id')id: number) {
    return this.profileService.updateProfile(dto, id, file);
  }

  // @Role('MANAGER')
  // @UseGuards(RoleGuards)
  @Get('/me')
  profileMe(@UserDecorator('id')id: number) {
    return this.profileService.profileMe(id);
  }

  @Get(":id")
  getProfile(@Param('id')id:number){
    return this.profileService.getProfileById(id)
  }
}