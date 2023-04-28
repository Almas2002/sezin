import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RoleService } from '../role/role.service';
import { AddRoleDto } from './dto/add-role.dto';
import { UserRegistrationDto } from '../auth/dto/user-registration.dto';

export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private roleService: RoleService) {
  }

  async create(dto: UserRegistrationDto, rol: string = 'ADMIN') {
    let role = await this.roleService.getRoleByValue(rol);
    if (!role) {
      role = await this.roleService.create({ description: `${rol} сайта`, value: rol });
    }
    const user = await this.userRepository.save({ ...dto });
    user.roles = [role];
    await this.userRepository.save(user);
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
    user.score = score;
    await this.userRepository.save(user);
  }

  async getUserId(id: number) {
    return this.userRepository.findOne({ where: { id }, relations: ['roles','vebinars'] });
  }
}