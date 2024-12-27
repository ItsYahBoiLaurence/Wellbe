import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Inject,
} from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from '@x/logging';
import {
  CommonModulePlatform,
  CommonConfigOptions,
} from '../common-config-options';
import {
  DEFAULT_ERROR_STATUS_CODE,
  HELPERS_CONFIG_OPTIONS,
  HeaderNames,
} from '../constants';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
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
    if (!request) return next.handle();

    const { url, method, headers, user, body, params, query } = request;
    const correlationId = headers?.[HeaderNames.CORRELATION_ID];

    return next.handle().pipe(
      catchError((err) => {
        if (user) Sentry.setUser(user);
        this.loggerService.error(
          `Error encountered when hitting ${method} - ${url} - status: ${
            err?.statusCode || DEFAULT_ERROR_STATUS_CODE
          }`,
          {
            user,
            correlationId,
            query,
            params,
            body,
            ...err,
          }
        );

        return throwError(() => new Error(err));
      })
    );
  }
}
