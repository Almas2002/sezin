import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../../model/room/room.entity';
import { Repository } from 'typeorm';
import { PageI } from '../../model/page.interface';
import { User } from '../../../user/user.entity';


@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private roomRepository: Repository<Room>) {
  }

  async getRoomsForUser(userId: number, option: PageI) {
    const query = this.roomRepository
      .createQueryBuilder('room')
      .leftJoin('room.users', 'users')
      .where('users.id =:userId', { userId })
      .leftJoinAndSelect('room.users', 'all_users')
      .orderBy('room.updatedAt', 'DESC')
      .limit(option.limit)
      .offset(option.offset);
    return await query.getMany();
  }

  async createRoom(creator: User, user: User) {
    let combination = creator.id + user.id;
    const candidate = await this.roomRepository.findOne({ where: { combination } ,relations:["users"]});
    if (candidate) {
      return candidate;
    }
    const room = await this.roomRepository.save({ combination });
    room.users = [creator, user];
    return await this.roomRepository.save(room);
  }

  async getRoom(id: number): Promise<Room> {
    return await this.roomRepository.findOne({ where: { id },relations:["joinedUsers"] });
  }
}