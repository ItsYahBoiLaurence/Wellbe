import { HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { CommonModulePlatform } from '../common-config-options';
import { AppException, BaseErrors, ErrorInfo } from '../models';
import { ExceptionInterceptor } from './exception.interceptor';

jest.mock('@golevelup/nestjs-rabbitmq', () => ({
  ...(jest.requireActual('@golevelup/nestjs-rabbitmq') as any),
  isRabbitContext: jest.fn().mockResolvedValue(false),
}));

describe('ExceptionInterceptor', () => {
  let mockCallHandler;
  let mockNextHandle;
  let mockLogger;
  let mockContext;
  let mockError;

  beforeEach(() => {
    mockContext = {
      switchToHttp: jest.fn(() => ({
        getRequest: () => ({
          url: '/',
          method: 'GET',
          headers: {
            'x-correlation-id': 'correlation-id',
          },
          user: { id: 'user-id' },
        }),
      })),
    };
    mockError = new AppException(
      new ErrorInfo(
        BaseErrors.UNHANDLED_ERROR,
        undefined,
        HttpStatus.BAD_REQUEST
      )
    );
    mockLogger = { error: jest.fn() };
    mockNextHandle = jest.fn(() => throwError(mockError));
    mockCallHandler = { handle: mockNextHandle };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should be defined', () => {
      const interceptor = new ExceptionInterceptor(mockLogger, {
        platform: CommonModulePlatform.EXPRESS,
      });
      expect(interceptor).toBeDefined();
    });
  });

  describe('intercept', () => {
    it('should not log if request or response is empty', (done: any) => {
      mockContext = {
        switchToHttp: jest.fn(() => ({
          getRequest: () => null,
          getResponse: () => null,
        })),
      };
      const interceptor = new ExceptionInterceptor(mockLogger, {
        platform: CommonModulePlatform.EXPRESS,
      });
      const result: Observable<any> = interceptor.intercept(
        mockContext,
        mockCallHandler
      );
      result.subscribe({
        next: () => {
          expect(mockLogger.error).not.toBeCalled();
        },
        error: () => {
          done();
        },
        complete: () => {
          done();
        },
      });
    });
    it('should log and return error for express', (done: any) => {
      const interceptor = new ExceptionInterceptor(mockLogger, {
        platform: CommonModulePlatform.EXPRESS,
      });
      const result: Observable<any> = interceptor.intercept(
        mockContext,
        mockCallHandler
      );
      result.subscribe({
        next: () => {
          expect(mockLogger.error).toBeCalledWith(
            'Error encountered when hitting GET - / - status: 400'
          );
        },
        error: (e) => {
          expect(e).toMatchObject(mockError);
          done();
        },
        complete: () => {
          done();
        },
      });
    });
    it('should log and return error for fastify', (done: any) => {
      const interceptor = new ExceptionInterceptor(mockLogger, {
        platform: CommonModulePlatform.FASTIFY,
      });
      mockContext = {
        switchToHttp: jest.fn(() => ({
          getRequest: () => ({
            raw: {
              url: '/',
              method: 'GET',
            },
          }),
        })),
      };
      const result: Observable<any> = interceptor.intercept(
        mockContext,
        mockCallHandler
      );
      result.subscribe({
        next: () => {
          expect(mockLogger.error).toBeCalledWith(
            'Error encountered when hitting GET - / - status: 400'
          );
        },
        error: (e) => {
          expect(e).toMatchObject(mockError);
          done();
        },
        complete: () => {
          done();
        },
      });
    });
  });
});
