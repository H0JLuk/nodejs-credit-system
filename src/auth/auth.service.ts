import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../users/schemas/user.schema';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const mailConfirmationCode = this.generateUnicCode();
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
      mailConfirmationCode,
    });
    await this.mailService.sendEmailConfirmation(
      user.email,
      mailConfirmationCode,
    );

    return this.generateToken(user);
  }

  private generateToken(user: User): { token: string } {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const payload = { email: user.email, id: user._id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto): Promise<User> {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный емайл или пароль',
    });
  }

  private generateUnicCode(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
