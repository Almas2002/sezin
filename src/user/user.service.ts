import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RoleService } from '../role/role.service';
import { AddRoleDto } from './dto/add-role.dto';
import { UserRegistrationDto } from '../auth/dto/user-registration.dto';
import { QueryUsersDto } from './dto/query.users.dto';
import { ProfileService } from '../profile/profile.service';
import { ExerciseStatus, UserExerciseEntity } from './user-exercise.entity';

export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, @InjectRepository(UserExerciseEntity) private exercise: Repository<UserExerciseEntity>,
              private roleService: RoleService, private profileService: ProfileService) {
  }

  async create(dto: UserRegistrationDto, rol: string = 'ADMIN') {
    let role = await this.roleService.getRoleByValue(rol);
    if (!role) {
      role = await this.roleService.create({ description: `${rol} сайта`, value: rol });
    }
    const user = await this.userRepository.save({ ...dto });
    user.roles = [role];
    await this.userRepository.save(user);
    await this.profileService.createProfile(user.id);
    delete user.password;
    return user;
  }

  async findUserById(id: number) {
    return await this.userRepository.findOne({ where: { id }, relations: ['roles'] });
  }

  async deleteRoleFromUser(dto: AddRoleDto) {
    const { role, user } = await this.workWithRole(dto);
    const roles = user.roles.filter(e => e.value !== role.value);
    user.roles = [...roles];
    await this.userRepository.save(user);
    delete user.password;
    return user;
  }

  async addRole(roleValue: string, userId: number) {
    let role = await this.roleService.getRoleByValue(roleValue);
    if (!role) {
      role = await this.roleService.create({ description: `${role} сайта`, value: roleValue });
    }
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['roles'] });
    user.roles = [...user.roles, role];
    await this.userRepository.save(user);
  }

  async addRoleWithEmail(roleValue: string, email: string) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new HttpException('not found', 404);
    }
    await this.addRole(roleValue, user.id);
  }

  async workWithRole(dto: AddRoleDto) {
    const user = await this.getUserByEmail(dto.email);
    const role = await this.roleService.getRoleByValue(dto.role);
    if (!user || !role) {
      throw new HttpException('не найден пользователь или роль', HttpStatus.BAD_REQUEST);
    }

    if (user.roles.some(userRole => userRole.value == role.value)) {
      return;
    }
    return { user, role };
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email }, select: ['password', 'id', 'email'] });
  }

  async updateScore(id: number, score: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (score == 0 || score >= 9)
      user.score = score;
    await this.userRepository.save(user);
  }

  async getUserId(id: number) {
    return this.userRepository.findOne({ where: { id }, relations: ['roles', 'vebinars', 'bothVebinars'] });
  }

  async getCount(id: number) {
    const processingCount = await this.exercise.count({ where: { status: ExerciseStatus.ISPROCESSING, user: { id } } });
    const endCount = await this.exercise.count({ where: { status: ExerciseStatus.END, user: { id } } });
    return { processingCount, endCount };
  }

  async getUsers(dto: QueryUsersDto) {
    const query = this.userRepository.createQueryBuilder('users')
      .leftJoinAndSelect('users.roles', 'roles');

    if (dto?.role) {
      query.andWhere('roles.value = :role', { role: dto.role });
      query.leftJoinAndSelect('users.profile', 'profile');
      query.leftJoinAndSelect('users.vebinars', 'vebinars');
    }

    const data = await query.getManyAndCount();
    return { data: data[0], count: data[1] };
  }


  async buy(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    user.isSubscriber = true;
    await this.userRepository.save(user);
  }

  async start(id: number, userId: number) {
    const exercise = await this.exercise.findOne({
      where: {
        exercise: { id },
        user: { id: userId },
        status: ExerciseStatus.ISPROCESSING,
      },
    });
    if (exercise) {
      return;
    }
    await this.exercise.save({ status: ExerciseStatus.ISPROCESSING, exercise: { id }, user: { id: userId } });
  }

  async end(id: number, userId: number) {
    const exercise = await this.exercise.findOne({ where: { exercise: { id }, user: { id: userId } } });
    exercise.status = ExerciseStatus.END;
    await this.exercise.save(exercise);
  }

  async deleteUser(id:number){
    await this.userRepository.delete({id})
  }
}