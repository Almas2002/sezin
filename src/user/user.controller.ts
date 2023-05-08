import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UserDecorator } from '../decorators/user.decorator';
import { RoleGuards } from '../auth/guard/role.guard';
import { Role } from '../decorators/role.decorator';
import { AddRoleDto } from './dto/add-role.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Put()
  @UseGuards(AuthGuard)
  update(@UserDecorator('id')id: number, @Body('score')score: number) {
    return this.userService.updateScore(id, score);
  }

  @Get('me')
  async userMe(@UserDecorator('id')id: number) {
    return this.userService.getUserId(id);
  }
  @Role("ADMIN")
  @UseGuards(RoleGuards)
  @Post("add-role")
  addRole(@Body()dto:AddRoleDto){
    return this.userService.addRoleWithEmail(dto.role,dto.email)
  }

  @Role("ADMIN")
  @UseGuards(RoleGuards)
  @Get()
  getUsers(){
    return this.userService.getUsers()
  }
}