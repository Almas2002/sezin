import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vebinar } from './vebinar.entity';
import { Repository } from 'typeorm';
import { CreateVebinarDto } from './vebinar.dto';
import { UserService } from '../user/user.service';
import { FileService } from '../file/file.service';

@Injectable()
export class VebinarService {
  constructor(@InjectRepository(Vebinar) private vebinarRepository: Repository<Vebinar>, private userService: UserService, private fileService: FileService) {
  }

  async create(dto: CreateVebinarDto, image: any, userId: number): Promise<{ id: number }> {
    const fileName = await this.fileService.createFile(image);
    const vebinar = await this.vebinarRepository.save({ user: { id: userId }, image: fileName, title: dto.title });
    return { id: vebinar.id };
  }

  async getAll(authId: number) {
    if (authId) {
      return this.vebinarRepository.find({ where: { user: { id: authId } }, relations: ['user', 'customers'] });
    }
    return this.vebinarRepository.find({ relations: ['user', 'customers'] });
  }

  async buy(vebinarId: number, userId: number) {
    const vebinar = await this.vebinarRepository.findOne({ where: { id: vebinarId }, relations: ['customers'] });
    const user = await this.userService.findUserById(userId);
    vebinar.customers = [...vebinar.customers, user];
    await this.vebinarRepository.save(vebinar);
  }

  async delete(id:number){
    await this.vebinarRepository.delete({id})
  }


}