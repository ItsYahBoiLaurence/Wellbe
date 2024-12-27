import { DynamicModule, Global, Module } from '@nestjs/common';
import { LOGGER_OPTIONS } from './constants';
import { LoggerOptions } from './logger-options.model';
import { LoggerService } from './logger.service';

@Global()
@Module({})
export class LoggingModule {
  static register(loggerOptions?: LoggerOptions): DynamicModule {
    return {
      module: LoggingModule,
      providers: [
        {
          provide: LOGGER_OPTIONS,
          useValue: loggerOptions,
        },
        LoggerService,
      ],
      exports: [LoggerService],
    };
  }
}
