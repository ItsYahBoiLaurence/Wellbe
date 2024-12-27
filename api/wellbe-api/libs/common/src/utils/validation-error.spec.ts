import { ValidationError } from '@nestjs/common';
import {
  AppException,
  EmptyResponseError,
  InvalidArgumentsError,
  UnhandledError,
  ValidationError as AppValidationError,
} from '../models';
import { throwValidationErrors } from './validation-errors';

type ValidationErrorType = {
  property?: string;
  contexts?: any;
  children?: ValidationErrorType[];
};

describe('validation-errors', () => {
  let validationErrors: ValidationErrorType[];

  beforeEach(() => {
    validationErrors = [
      {
        property: 'foo',
        contexts: [
          { unhandled: new UnhandledError() },
          { invalidArgs: new InvalidArgumentsError() },
        ],
      },
      {
        property: 'bar',
        contexts: [
          { invalidArgs: new InvalidArgumentsError() },
          { empty: new EmptyResponseError() },
        ],
      },
    ];
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('throwValidationErrors', () => {
    it('should throw AppException with validation errors listed', () => {
      const expected = new AppException(new AppValidationError().error, [
        {
          property: 'foo',
          errors: [
            new UnhandledError().error.message,
            new InvalidArgumentsError().error.message,
          ],
        },
        {
          property: 'bar',
          errors: [
            new InvalidArgumentsError().error.message,
            new EmptyResponseError().error.message,
          ],
        },
      ]);
      expect(() =>
        throwValidationErrors(validationErrors as unknown as ValidationError[])
      ).toThrow(expected);
    });
    it('should throw AppException with UnhandledError if no validation errors are provided', () => {
      const expected = new UnhandledError().exception;
      expect(() => throwValidationErrors()).toThrow(expected);
    });
    it('should not process errors with missing contexts', () => {
      validationErrors = [
        { property: 'foo' },
        {
          property: 'bar',
          contexts: [new InvalidArgumentsError(), new EmptyResponseError()],
        },
      ];
      const expected = new AppException(new AppValidationError().error, [
        {
          property: 'bar',
          errors: [
            new InvalidArgumentsError().error.message,
            new EmptyResponseError().error.message,
          ],
        },
      ]);
      expect(() =>
        throwValidationErrors(validationErrors as unknown as ValidationError[])
      ).toThrow(expected);
    });
    it('should not process errors with missing property name', () => {
      validationErrors = [
        {
          property: 'foo',
          contexts: [new UnhandledError(), new InvalidArgumentsError()],
        },
        { contexts: [new InvalidArgumentsError(), new EmptyResponseError()] },
      ];
      const expected = new AppException(new AppValidationError().error, [
        {
          property: 'foo',
          errors: [
            new UnhandledError().error.message,
            new InvalidArgumentsError().error.message,
          ],
        },
      ]);
      expect(() =>
        throwValidationErrors(validationErrors as unknown as ValidationError[])
      ).toThrow(expected);
    });
    it('should process errors with children and return nested property names', () => {
      validationErrors = [
        {
          property: 'foo',
          contexts: [
            { unhandled: new UnhandledError() },
            { invalidArgs: new InvalidArgumentsError() },
          ],
        },
        {
          property: 'bar',
          contexts: [
            { invalidArgs: new InvalidArgumentsError() },
            { empty: new EmptyResponseError() },
          ],
        },
        {
          property: 'foobar',
          children: [
            {
              property: 'baz',
              contexts: [
                { invalidArgs: new InvalidArgumentsError() },
                { empty: new EmptyResponseError() },
              ],
            },
          ],
        },
      ];
      const expected = new AppException(new AppValidationError().error, [
        {
          property: 'foo',
          errors: [
            new UnhandledError().error.message,
            new InvalidArgumentsError().error.message,
          ],
        },
        {
          property: 'bar',
          errors: [
            new InvalidArgumentsError().error.message,
            new EmptyResponseError().error.message,
          ],
        },
        {
          property: 'foobar.baz',
          errors: [
            new InvalidArgumentsError().error.message,
            new EmptyResponseError().error.message,
          ],
        },
      ]);
      expect(() =>
        throwValidationErrors(validationErrors as unknown as ValidationError[])
      ).toThrow(expected);
    });
  });
});
