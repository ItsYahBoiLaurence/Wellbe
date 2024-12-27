import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as Sentry from '@sentry/node';
import { LOGGER_OPTIONS } from './constants';
import { LoggerOptions } from './logger-options.model';

@Injectable()
export class LoggerService extends ConsoleLogger {
  logger: winston.Logger;

  loggerOptions: LoggerOptions;

  static DEFAULT_CONTEXT_NAME = 'API';

  get canLogWithTransports(): boolean {
    return this.logger?.transports?.length > 0;
  }

  constructor(@Inject(LOGGER_OPTIONS) options: LoggerOptions) {
    super(options?.appName || LoggerService.DEFAULT_CONTEXT_NAME, {
      timestamp: true,
    });
    this.loggerOptions = options;
    this.init();
    this.createLogger();
  }

  log(message: string, metadata: any = null) {
    super.log(message);
    if (this.canLogWithTransports)
      this.logger.log('info', this.formatLogMessage(message), metadata);
  }

  info(message: string, metadata: any = null) {
    super.log(message);
    if (this.canLogWithTransports)
      this.logger.log('info', this.formatLogMessage(message), metadata);

    if (Sentry) {
      Sentry.captureMessage(message, {
        extra: metadata,
        tags: { appName: this.loggerOptions.appName },
      });
    }
  }

  error(message: string, error?: any, metadata?: any) {
    super.error(message, error?.stack || error);
    if (this.canLogWithTransports)
      this.logger.log('error', this.formatLogMessage(message), error);

    if (Sentry) {
      Sentry.captureMessage(message, {
        extra: metadata,
        tags: { appName: this.loggerOptions.appName },
      });
      Sentry.captureException(message, {
        syntheticException: error,
      });
    }
  }

  warn(message: string, metadata: any = null) {
    super.warn(message);
    if (this.canLogWithTransports)
      this.logger.log('warn', this.formatLogMessage(message), metadata);

    if (Sentry)
      Sentry.captureMessage(message, {
        extra: metadata,
        tags: { appName: this.loggerOptions.appName },
      });
  }

  private init() {
    if (!this.options)
      this.loggerOptions = { appName: LoggerService.DEFAULT_CONTEXT_NAME };
  }

  private createLogger() {
    const logger: winston.Logger = winston.createLogger();

    logger.exitOnError = false;
    logger.format = winston.format.combine(
      winston.format.json(),
      winston.format.timestamp()
    );

    if (this.loggerOptions.console)
      logger.add(new winston.transports.Console(this.loggerOptions.console));

    this.logger = logger;
  }

  private formatLogMessage(message: string) {
    return `[${this.loggerOptions.appName}] - ${message}`;
  }
}
