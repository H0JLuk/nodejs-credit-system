import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { MailService } from './mail.service';
import * as path from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: `smtps://${process.env.MAIL_USERNAME}:${process.env.MAIL_PASSWORD}@${process.env.MAIL_SMTP_DOMAIN}`,
      defaults: {
        from: `"No Reply" <${process.env.MAIL_USERNAME}>`,
      },
      template: {
        dir: path.join(__dirname, 'templates'),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
