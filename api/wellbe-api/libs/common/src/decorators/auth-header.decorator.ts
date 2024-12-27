import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export type AuthorizationHeaderKeyValue = {
  Authorization: string;
};

export const authHeaderHandler = (_: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  if (!request?.headers?.authorization) return null;
  return {
    Authorization: request.headers.authorization,
  } as AuthorizationHeaderKeyValue;
};

/**
 * Gets authenticated user id of the current request
 * If not authenticated, it will return null
 */
export const AuthHeader = createParamDecorator(authHeaderHandler);
