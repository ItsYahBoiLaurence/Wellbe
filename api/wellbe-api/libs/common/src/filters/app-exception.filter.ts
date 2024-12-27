import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import {
  DEFAULT_ERROR_STATUS_CODE,
  HELPERS_CONFIG_OPTIONS,
} from '../constants';
import {
  CommonConfigOptions,
  CommonModulePlatform,
} from '../common-config-options';
import { AppException, UnauthorizedError } from '../models';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(HELPERS_CONFIG_OPTIONS)
    private configOptions: CommonConfigOptions
  ) {}

  catch(exception: AppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response =
      this.configOptions.platform === CommonModulePlatform.EXPRESS
        ? ctx.getResponse<Response>()
        : ctx.getResponse().raw;

    const exResponse = exception.getResponse
      ? exception.getResponse()
      : exception;
    if (exResponse && typeof exResponse !== 'string') {
      const exStatus = exResponse['statusCode'];
      if (exStatus === HttpStatus.UNAUTHORIZED) {
        response
          .status(HttpStatus.UNAUTHORIZED)
          .send(new UnauthorizedError().exception);
        return;
      }
    }

    if (this.configOptions.platform === CommonModulePlatform.EXPRESS) {
      response
        .status(exception?.statusCode || DEFAULT_ERROR_STATUS_CODE)
        .send(exception);
    } else {
      response
        .status(exception?.statusCode || DEFAULT_ERROR_STATUS_CODE)
        .send(exception);
    }
  }
}
