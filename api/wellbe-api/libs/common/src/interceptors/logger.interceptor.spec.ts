import { Observable, of } from 'rxjs';
import { CommonModulePlatform } from '../common-config-options';
import { LoggerInterceptor } from './logger.interceptor';

jest.mock('@golevelup/nestjs-rabbitmq', () => ({
  ...(jest.requireActual('@golevelup/nestjs-rabbitmq') as any),
  isRabbitContext: jest.fn().mockResolvedValue(false),
}));

describe('LoggerInterceptor', () => {
  let mockCallHandler;
  let mockNextHandle;
  let mockLogger;
  let mockContext;

  beforeEach(() => {
    mockContext = {
      switchToHttp: jest.fn(() => ({
        getRequest: () => ({
          method: 'GET',
          statusCode: 200,
          url: '/',
          headers: {
            'x-correlation-id': 'correlation-id',
          },
          user: { id: 'user-id' },
        }),
      })),
    };
    mockLogger = { log: jest.fn() };
    mockNextHandle = jest.fn(() => of({}));
    mockCallHandler = { handle: mockNextHandle };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should be defined', () => {
      const interceptor = new LoggerInterceptor(mockLogger, {
        platform: CommonModulePlatform.EXPRESS,
      });
      expect(interceptor).toBeDefined();
    });
  });

  describe('intercept', () => {
    it('should log request for express', (done: any) => {
      const interceptor = new LoggerInterceptor(mockLogger, {
        platform: CommonModulePlatform.EXPRESS,
      });
      const result: Observable<any> = interceptor.intercept(
        mockContext,
        mockCallHandler
      );
      result.subscribe({
        next: () => {
          expect(mockLogger.log).toBeCalled();
        },
        error: () => {
          done();
        },
        complete: () => {
          done();
        },
      });
    });
    it('should log request for fastify', (done: any) => {
      mockContext = {
        switchToHttp: jest.fn(() => ({
          getRequest: () => ({
            raw: {
              method: 'GET',
              statusCode: 200,
              url: '/',
              headers: {
                'x-correlation-id': 'correlation-id',
              },
              user: { id: 'user-id' },
            },
          }),
        })),
      };
      const interceptor = new LoggerInterceptor(mockLogger, {
        platform: CommonModulePlatform.FASTIFY,
      });
      const result: Observable<any> = interceptor.intercept(
        mockContext,
        mockCallHandler
      );
      result.subscribe({
        next: () => {
          expect(mockLogger.log).toBeCalled();
        },
        error: () => {
          done();
        },
        complete: () => {
          done();
        },
      });
    });
  });
});
