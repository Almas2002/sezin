import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UserDecorator } from '../decorators/user.decorator';
import { RoleGuards } from '../auth/guard/role.guard';
import { Role } from '../decorators/role.decorator';
import { AddRoleDto } from './dto/add-role.dto';
import { QueryUsersDto } from './dto/query.users.dto';
import { Auth } from '../auth/auth.entity';

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

  // @Role('ADMIN')
  // @UseGuards(RoleGuards)
  @Post('add-role')
  addRole(@Body()dto: AddRoleDto) {
    return this.userService.addRoleWithEmail(dto.role, dto.email);
  }

  @Get()
  getUsers(@Query() query: QueryUsersDto) {
    return this.userService.getUsers(query);
  }

  @Put('/buy')
  async buy(@Body('email')email: string) {
    return this.userService.buy(email);
  }

  @UseGuards(AuthGuard)
  @Put('exercise/start/:id')
  start(@Param('id')id: number, @UserDecorator('id')userId: number) {
    return this.userService.start(id, userId);
  }

  @UseGuards(AuthGuard)
  @Get('/count')
  count(@UserDecorator('id')userId: number) {
    return this.userService.getCount(userId);
  }

  @UseGuards(AuthGuard)
  @Put('exercise/end/:id')
  end(@Param('id')id: number, @UserDecorator('id')userId: number) {
    return this.userService.end(id, userId);
  }
}