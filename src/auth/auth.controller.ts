import { Body, Controller, Get, HttpException, Post, Req, Res } from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {AuthService} from './auth.service';
import {UserLoginDto} from './dto/user-login.dto';
import { UserRegistrationDto } from './dto/user-registration.dto';


@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @ApiOperation({summary: 'login пользователя'})
  @ApiResponse({status: 201})
  @Post('login')
  async login(@Body()data: UserLoginDto, @Res({passthrough: true})res) {
    const response = await this.authService.login(data);
    res.cookie('refreshToken', response.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
    return response.access_token
  }

  @ApiOperation({summary: 'registration пользователя'})
  @ApiResponse({status: 201})
  @Post('registration')
  async registration(@Body()data: UserRegistrationDto, @Res({passthrough: true})res) {
    const response = await this.authService.registration(data);
    res.cookie('refreshToken', response.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
    return response.access_token;
  }

  @ApiOperation({summary: 'refresh пользователя'})
  @ApiResponse({status: 201})
  @Get('refresh')
  async refresh(@Req()request, @Res({passthrough: true})response) {
    const {refreshToken} = request.cookies;
    const res = await this.authService.refresh(refreshToken);
    response.cookie('refreshToken', response.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
    return res.access_token;
  }


  @ApiOperation({summary: 'logout пользователя'})
  @ApiResponse({status: 201})
  @Get('logout')
  async logout(@Req()request, @Res({passthrough: true})response) {
    if(!request?.cookies?.refreshToken){
      throw new HttpException("нет токена",401)
    }
    const {refreshToken} = request?.cookies;
    if(!refreshToken){
      throw new HttpException("нет токена",401)
    }
    response.clearCookie('refresh_token');
    await this.authService.logout(refreshToken);
  }

  @ApiOperation({summary: 'создать супер админа пользователя'})
  @ApiResponse({status: 201})
  @Post('create-super-user')
  async createSuperUser(@Res({passthrough: true})res) {
    const data = {
      fullName:"Diana",
      email: "diana2000@gmail.com",
      password: "12345",
    };
    const response = await this.authService.registration(data, true);
    res.cookie('refreshToken', response.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

  }

}