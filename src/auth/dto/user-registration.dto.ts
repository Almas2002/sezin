import { UserLoginDto } from './user-login.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegistrationDto extends UserLoginDto{
  @ApiProperty()
  fullName:string
}