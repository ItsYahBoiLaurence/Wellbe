import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ForbiddenError } from '../models';

export const requestMetadataHandler = (
  objKey: string,
  ctx: ExecutionContext
) => {
  const handler = ctx.getHandler();
  const hasMetadataValue = Reflect.getMetadataKeys(handler).find(
    (key) => key === objKey
  );
  if (!hasMetadataValue) throw new ForbiddenError().exception;
  const result = Reflect.getMetadata(objKey, handler);
  return result;
};

export const RequestMetadata = createParamDecorator(requestMetadataHandler);
