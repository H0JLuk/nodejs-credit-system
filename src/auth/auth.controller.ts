import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CustomValidationPipe } from '../pipes/custom-validation.pipe';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UsePipes(CustomValidationPipe)
  login(@Body() userDto: CreateUserDto): Promise<{ token: string }> {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  @UsePipes(CustomValidationPipe)
  registration(@Body() userDto: CreateUserDto): Promise<{ token: string }> {
    return this.authService.registration(userDto);
  }
}
