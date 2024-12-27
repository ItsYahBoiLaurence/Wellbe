import { HttpStatus } from '@nestjs/common';
import { BaseErrors } from './enums';
import { ErrorInfo } from './error-info.entity';
import { EntityMetadata } from './metadata.entity';
import { AppException } from './app-exception.entity';

export class ErrorMetadata<TEntity> extends EntityMetadata<TEntity> {
  constructor(opts: ErrorMetadataOptions) {
    const { type, message, statusCode } = opts;
    super(undefined, new ErrorInfo(type, message, statusCode));
  }

  public get exception(): AppException {
    return new AppException(this.error);
  }
}

export class UnhandledError<TEntity> extends ErrorMetadata<TEntity> {
  constructor(message?: string) {
    super({
      type: BaseErrors.UNHANDLED_ERROR,
      message: message ?? 'Unhandled error occurred',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}

export class InvalidArgumentsError<TEntity> extends ErrorMetadata<TEntity> {
  constructor(message?: string) {
    super({
      type: BaseErrors.INVALID_ARGUMENTS,
      message: message ?? 'Invalid arguments',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}

export class ConnectionTimeoutError<TEntity> extends ErrorMetadata<TEntity> {
  constructor() {
    super({
      type: BaseErrors.CONNECTION_TIMEOUT,
      message: 'Connection timed out. Please try again.',
      statusCode: HttpStatus.REQUEST_TIMEOUT,
    });
  }
}

export class NotFoundError<TEntity> extends ErrorMetadata<TEntity> {
  constructor(message?: string) {
    super({
      type: BaseErrors.NOT_FOUND,
      message: message ?? 'Resource not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}

export class UnauthorizedError<TEntity> extends ErrorMetadata<TEntity> {
  constructor() {
    super({
      type: BaseErrors.UNAUTHORIZED,
      message: 'Unauthorized access',
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }
}

export class ForbiddenError<TEntity> extends ErrorMetadata<TEntity> {
  constructor(message?: string) {
    super({
      type: BaseErrors.FORBIDDEN,
      message: message || 'Cannot access resource',
      statusCode: HttpStatus.FORBIDDEN,
    });
  }
}

export class EmptyResponseError<TEntity> extends ErrorMetadata<TEntity> {
  constructor() {
    super({
      type: BaseErrors.EMPTY_RESPONSE,
      message: 'No response from server',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}

export class FailedToCreateResourceError<
  TEntity,
> extends ErrorMetadata<TEntity> {
  constructor(message?: string) {
    super({
      type: BaseErrors.FAILED_TO_CREATE_RESOURCE,
      message: message ?? 'Failed to create resource',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}

export class FailedToUpdateResourceError<
  TEntity,
> extends ErrorMetadata<TEntity> {
  constructor(message?: string) {
    super({
      type: BaseErrors.FAILED_TO_UPDATE_RESOURCE,
      message: message ?? 'Failed to update resource',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}

export class FailedToDeleteResourceError<
  TEntity,
> extends ErrorMetadata<TEntity> {
  constructor(message?: string) {
    super({
      type: BaseErrors.FAILED_TO_DELETE_RESOURCE,
      message: message ?? 'Failed to delete resource',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}

export class AlreadyExistsError<TEntity> extends ErrorMetadata<TEntity> {
  constructor(message?: string) {
    super({
      type: BaseErrors.ALREADY_EXISTS,
      message: message ?? 'Resource already exists',
      statusCode: HttpStatus.CONFLICT,
    });
  }
}

export class ValidationError<TEntity> extends ErrorMetadata<TEntity> {
  constructor(message?: string) {
    super({
      type: BaseErrors.VALIDATION_ERROR,
      message:
        message ??
        'Validation errors encountered while processing your resource',
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    });
  }
}

export class InvalidCredentialsError<TEntity> extends ErrorMetadata<TEntity> {
  constructor(message?: string) {
    super({
      type: BaseErrors.INVALID_CREDENTIALS,
      message: message ?? 'You have entered invalid credentials',
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }
}

export type ErrorMetadataOptions = {
  type: BaseErrors | any;
  message?: string;
  statusCode?: number;
  error?: any;
};
