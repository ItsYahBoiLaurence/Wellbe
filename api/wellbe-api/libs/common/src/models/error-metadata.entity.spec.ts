import { HttpStatus } from '@nestjs/common';
import {
  UnhandledError,
  InvalidArgumentsError,
  ConnectionTimeoutError,
  NotFoundError,
  EmptyResponseError,
  FailedToDeleteResourceError,
  FailedToUpdateResourceError,
  FailedToCreateResourceError,
  AlreadyExistsError,
  UnauthorizedError,
  ForbiddenError,
  ValidationError,
} from './error-metadata.entity';
import { EntityMetadata } from './metadata.entity';
import { ErrorInfo } from './error-info.entity';
import { BaseErrors } from './enums/';

describe('ErrorMetadata', () => {
  describe('UnhandledError', () => {
    it('should have correct values', () => {
      const expected = new EntityMetadata(
        undefined,
        new ErrorInfo(
          BaseErrors.UNHANDLED_ERROR,
          'Unhandled error occurred',
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      );
      expect(new UnhandledError()).toMatchObject(expected);
    });
    it('should set message if provided', () => {
      const expected = new EntityMetadata(
        undefined,
        new ErrorInfo(
          BaseErrors.UNHANDLED_ERROR,
          'foobar',
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      );
      expect(new UnhandledError('foobar')).toMatchObject(expected);
    });
  });

  describe('InvalidArgumentsError', () => {
    it('should have correct values', () => {
      const expected = new EntityMetadata(
        undefined,
        new ErrorInfo(
          BaseErrors.INVALID_ARGUMENTS,
          'Invalid arguments',
          HttpStatus.BAD_REQUEST
        )
      );
      expect(new InvalidArgumentsError()).toMatchObject(expected);
    });
  });

  describe('ConnectionTimeoutError', () => {
    it('should have correct values', () => {
      const expected = new EntityMetadata(
        undefined,
        new ErrorInfo(
          BaseErrors.CONNECTION_TIMEOUT,
          'Connection timed out. Please try again.',
          HttpStatus.REQUEST_TIMEOUT
        )
      );
      expect(new ConnectionTimeoutError()).toMatchObject(expected);
    });
  });

  describe('UnauthorizedError', () => {
    it('should have correct values', () => {
      const expected = new EntityMetadata(
        undefined,
        new ErrorInfo(
          BaseErrors.UNAUTHORIZED,
          'Unauthorized access',
          HttpStatus.UNAUTHORIZED
        )
      );
      expect(new UnauthorizedError()).toMatchObject(expected);
    });
  });

  describe('ForbiddenError', () => {
    it('should have correct values', () => {
      const expected = new EntityMetadata(
        undefined,
        new ErrorInfo(
          BaseErrors.FORBIDDEN,
          'Cannot access resource',
          HttpStatus.FORBIDDEN
        )
      );
      expect(new ForbiddenError()).toMatchObject(expected);
    });
  });

  describe('NotFoundError', () => {
    it('should have correct values', () => {
      const expected = new EntityMetadata(
        undefined,
        new ErrorInfo(
          BaseErrors.NOT_FOUND,
          'Resource not found',
          HttpStatus.NOT_FOUND
        )
      );
      expect(new NotFoundError()).toMatchObject(expected);
    });
  });

  describe('EmptyResponseError', () => {
    it('should have correct values', () => {
      const expected = new EntityMetadata(
        undefined,
        new ErrorInfo(
          BaseErrors.EMPTY_RESPONSE,
          'No response from server',
          HttpStatus.BAD_REQUEST
        )
      );
      expect(new EmptyResponseError()).toMatchObject(expected);
    });
  });

  describe('FailedToCreateResourceError', () => {
    it('should have correct values', () => {
      const expected = new EntityMetadata(
        undefined,
        new ErrorInfo(
          BaseErrors.FAILED_TO_CREATE_RESOURCE,
          'Failed to create resource',
          HttpStatus.BAD_REQUEST
        )
      );
      expect(new FailedToCreateResourceError()).toMatchObject(expected);
    });
    it('should set message if provided', () => {
      const expected = new EntityMetadata(
        undefined,
        new ErrorInfo(
          BaseErrors.FAILED_TO_CREATE_RESOURCE,
          'Foobar failed',
          HttpStatus.BAD_REQUEST
        )
      );
      expect(new FailedToCreateResourceError('Foobar failed')).toMatchObject(
        expected
      );
    });
  });

  describe('FailedToUpdateResourceError', () => {
    it('should have correct values', () => {
      const expected = new EntityMetadata(
        undefined,
        new ErrorInfo(
          BaseErrors.FAILED_TO_UPDATE_RESOURCE,
          'Failed to update resource',
          HttpStatus.BAD_REQUEST
        )
      );
      expect(new FailedToUpdateResourceError()).toMatchObject(expected);
    });
    it('should set message if provided', () => {
      const expected = new EntityMetadata(
        undefined,
        new ErrorInfo(
          BaseErrors.FAILED_TO_UPDATE_RESOURCE,
          'Foobar failed',
          HttpStatus.BAD_REQUEST
        )
      );
      expect(new FailedToUpdateResourceError('Foobar failed')).toMatchObject(
        expected
      );
    });
  });

  describe('FailedToDeleteResourceError', () => {
    it('should have correct values', () => {
      const expected = new EntityMetadata(
        undefined,
        new ErrorInfo(
          BaseErrors.FAILED_TO_DELETE_RESOURCE,
          'Failed to delete resource',
          HttpStatus.BAD_REQUEST
        )
      );
      expect(new FailedToDeleteResourceError()).toMatchObject(expected);
    });
    it('should set message if provided', () => {
      const expected = new EntityMetadata(
        undefined,
        new ErrorInfo(
          BaseErrors.FAILED_TO_DELETE_RESOURCE,
          'Foobar failed',
          HttpStatus.BAD_REQUEST
        )
      );
      expect(new FailedToDeleteResourceError('Foobar failed')).toMatchObject(
        expected
      );
    });
  });

  describe('AlreadyExistsError', () => {
    it('should have correct values', () => {
      const expected = new EntityMetadata(
        undefined,
        new ErrorInfo(
          BaseErrors.ALREADY_EXISTS,
          'Resource already exists',
          HttpStatus.CONFLICT
        )
      );
      expect(new AlreadyExistsError()).toMatchObject(expected);
    });
    it('should set message if specified', () => {
      const expected = new EntityMetadata(
        undefined,
        new ErrorInfo(
          BaseErrors.ALREADY_EXISTS,
          'Foobar already exists',
          HttpStatus.CONFLICT
        )
      );
      expect(new AlreadyExistsError('Foobar already exists')).toMatchObject(
        expected
      );
    });
  });

  describe('ValidationError', () => {
    it('should have correct values', () => {
      const expected = new EntityMetadata(
        undefined,
        new ErrorInfo(
          BaseErrors.VALIDATION_ERROR,
          'Validation errors encountered while processing your resource',
          HttpStatus.UNPROCESSABLE_ENTITY
        )
      );
      expect(new ValidationError()).toMatchObject(expected);
    });
    it('should set message if specified', () => {
      const expected = new EntityMetadata(
        undefined,
        new ErrorInfo(
          BaseErrors.VALIDATION_ERROR,
          'Foobar',
          HttpStatus.UNPROCESSABLE_ENTITY
        )
      );
      expect(new ValidationError('Foobar')).toMatchObject(expected);
    });
  });
});
