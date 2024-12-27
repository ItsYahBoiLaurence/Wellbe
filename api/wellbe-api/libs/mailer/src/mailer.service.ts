import { Inject, Injectable } from '@nestjs/common';
import * as SgMail from '@sendgrid/mail';
import { LoggerService } from '@x/logging';
import { MAILER_CONFIG_OPTS } from './constants';
import { MailMessage } from './mail-message.entity';
import { MailerConfigOptions } from './mailer-config-options';

@Injectable()
export class MailerService {
  sgMail: SgMail.MailService;

  constructor(
    private logger: LoggerService,
    @Inject(MAILER_CONFIG_OPTS) private opts: MailerConfigOptions
  ) {
    this.sgMail = SgMail;
    this.sgMail.setApiKey(this.opts.sendgridKey);
  }

  async sendMail(data: MailMessage): Promise<void> {
    try {
      if (!this.sgMail) throw new Error('Sendgrid mailer not initialized');

      const msg: SgMail.MailDataRequired = {
        from: {
          email: data.from || this.opts.fromEmail,
          name: this.opts.fromName,
        },
        personalizations: [
          {
            to: [
              {
                email: data.to,
              },
            ],
            dynamicTemplateData: data.context,
          },
        ],
        subject: `${this.getEnvironment() === 'dev' ? '[DEV] ' : ''}${data.subject}`,
        templateId: data.templateId,
      };
      await this.sgMail.send(msg);
    } catch (error) {
      this.logger.error(
        `MailerService.sendMail | Failed to send mail to ${data?.to}`,
        error
      );
    }
  }

  private getEnvironment(): string {
    return process.env.ENVIRONMENT ?? 'dev';
  }
}
