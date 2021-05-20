import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmailConfirmation(email: string, confirmationCode: string) {
    const url =
      process.env.SERVER_API +
      `auth/submit-email?email=${email}&confirmation_code=${confirmationCode}`;

    let html = fs.readFileSync(
      path.join(__dirname, 'templates', 'emailSubmit.html'),
      'utf8',
    );
    html = html.replace(/\${emailSubmitURL}/gi, url);

    const mailInfo = await this.mailerService.sendMail({
      to: email,
      subject: 'Подтверждение e-mail',
      html,
    });

    return mailInfo;
  }

  async sendResetPasswordRequest({ email, confirmationCode }) {
    let html = await fs.readFileSync(
      path.resolve(__dirname, 'templates', 'passwordReset.html'),
      'utf8',
    );
    const url =
      process.env.CLIENT_API +
      `custom-url?email=${email}&confirmation_code=${confirmationCode}`;
    html = html.replace(/\${resetPasswordURL}/gi, url);

    const mailInfo = await this.mailerService.sendMail({
      subject: 'Запрос на восстановление пароля',
      to: email,
      html,
    });
    return mailInfo;
  }
}
