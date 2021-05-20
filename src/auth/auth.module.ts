import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: `${process.env.PRIVATE_KEY}`,
      signOptions: {
        expiresIn: '24h',
      },
    }),
    forwardRef(() => UsersModule),
    MailModule,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
