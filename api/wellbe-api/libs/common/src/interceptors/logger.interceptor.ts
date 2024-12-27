import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Inject,
} from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '@x/logging';
import {
  CommonModulePlatform,
  CommonConfigOptions,
} from '../common-config-options';
import { HELPERS_CONFIG_OPTIONS, HeaderNames } from '../constants';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    private loggerService: LoggerService,
    @Inject(HELPERS_CONFIG_OPTIONS)
    private configOptions: CommonConfigOptions
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request =
      this.configOptions.platform === CommonModulePlatform.EXPRESS
        ? ctx.getRequest()
        : ctx.getRequest().raw;
    const { url } = request;
    const type = request.method;
    const status = request.statusCode;
    const user = request.user;
    const correlationId = request.headers?.[HeaderNames.CORRELATION_ID];
    const body = request.body;
    const params = request.params;

    if (Sentry) {
      if (user) Sentry.setUser(user);
      Sentry.captureSession();
    }

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        if (Sentry) Sentry.captureSession(true);
        this.loggerService.info(
          `${type} - ${status}: ${url} - ${Date.now() - now}ms`,
          { user, correlationId, body, params }
        );
      })
    );
  }
}
