import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './profile.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class ProfileService{
  constructor(@InjectRepository(Profile)private profileRepository:Repository<Profile>,private fileService:FileService) {}


  async createProfile(id:number){
    await this.profileRepository.save({user:{id}})
  }

  async updateProfile(dto:CreateProfileDto,userId:number,file:any){
    const profile = await this.profileRepository.findOne({where:{user:{id:userId}}})
    if(!profile){
      throw new HttpException("профиль не найден",404)
    }
    profile.photo = await this.fileService.createFile(file)
    profile.phone = dto.phone
    profile.desc = dto.desc
    profile.smallDesc= dto.smallDesc

    await this.profileRepository.save(profile);
  }

  async profileMe(id:number){
    return await this.profileRepository.findOne({where:{user:{id}},relations:["user"]})
  }

  async getProfileById(userId:number){
    return this.profileRepository.findOne({where:{user:{id:userId}},relations:["user"]})
  }



}