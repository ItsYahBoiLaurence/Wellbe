import { DynamicModule, Module } from '@nestjs/common';
import { MAILER_CONFIG_OPTS } from './constants';
import { MailerConfigOptions } from './mailer-config-options';
import { MailerService } from './mailer.service';

@Module({})
export class MailerModule {
  static register(config: MailerConfigOptions, global = false): DynamicModule {
    return {
      global,
      module: MailerModule,
      providers: [
        {
          provide: MAILER_CONFIG_OPTS,
          useValue: config,
        },
        MailerService,
      ],
      exports: [MailerService],
    };
  }
}
