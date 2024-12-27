import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Inject,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as getRawBody from 'raw-body';
import {
  CommonModulePlatform,
  CommonConfigOptions,
} from '../common-config-options';
import { HELPERS_CONFIG_OPTIONS } from '../constants';

@Injectable()
export class RequestSanitizerInterceptor implements NestInterceptor {
  static getRawBody: any;

  constructor(
    @Inject(HELPERS_CONFIG_OPTIONS)
    private configOptions: CommonConfigOptions
  ) {
    RequestSanitizerInterceptor.getRawBody = getRawBody;
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    if (this.configOptions.platform === CommonModulePlatform.EXPRESS) {
      return RequestSanitizerInterceptor.handleExpressIntercept(context, next);
    }
    return RequestSanitizerInterceptor.handleFastifyIntercept(context, next);
  }

  static async handleExpressIntercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    if (!request) return next.handle();
    const type = request.method;
    if (type.toLowerCase() !== 'post' || !request.body) return next.handle();
    if (typeof request.body === 'string') {
      request.body = JSON.parse(request.body);
      return next.handle();
    }

    if (
      request.readable &&
      !RequestSanitizerInterceptor.isMultipartFormData(request)
    ) {
      // body is ignored by NestJS -> get raw body from request
      const raw = await RequestSanitizerInterceptor.getRawBody(request);
      const text = raw.toString().trim();
      request.body = !text ? null : JSON.parse(text);
    }
    return next.handle();
  }

  static async handleFastifyIntercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    if (!request || !request.raw) return next.handle();
    const type = request.raw.method;
    if (
      type.toLowerCase() === 'post' &&
      request.body &&
      typeof request.body === 'string'
    ) {
      request.body = JSON.parse(request.body);
    }
    return next.handle();
  }

  static isMultipartFormData(req: Request): boolean {
    if (!req?.headers?.['content-type']) return false;
    return req.headers['content-type'].includes('multipart/form-data');
  }
}
