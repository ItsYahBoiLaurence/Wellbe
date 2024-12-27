import { Observable, of } from 'rxjs';
import { EntitySanitizerInterceptor } from './entity-sanitizer.interceptor';

jest.mock('@golevelup/nestjs-rabbitmq', () => ({
  ...(jest.requireActual('@golevelup/nestjs-rabbitmq') as any),
  isRabbitContext: jest.fn().mockResolvedValue(false),
}));

describe('EntitySanitizerInterceptor', () => {
  let mockCallHandler;
  let mockNextHandle;
  let mockLogger;
  let interceptor;
  let mockContext;

  beforeEach(() => {
    mockContext = {
      switchToHttp: jest.fn(() => ({
        getRequest: () => ({
          originalUrl: '/',
          method: 'GET',
          params: undefined,
          query: undefined,
          body: undefined,
        }),
        getResponse: () => ({
          statusCode: 200,
        }),
      })),
    };
    mockLogger = { error: jest.fn() };
    mockNextHandle = jest.fn(() => of(null));
    mockCallHandler = { handle: mockNextHandle };
    interceptor = new EntitySanitizerInterceptor(mockLogger);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should be defined', () => {
      expect(interceptor).toBeDefined();
    });
    it('should initialize validators', () => {
      expect(interceptor.validators?.length).toBe(7);
    });
  });

  describe('intercept', () => {
    it('should return null if payload is null', (done: any) => {
      mockNextHandle = jest.fn(() => of(null));
      mockCallHandler = { handle: mockNextHandle };
      const result: Observable<any> = interceptor.intercept(
        mockContext,
        mockCallHandler
      );
      result.subscribe({
        next: (value) => {
          expect(value).toBe(null);
        },
        error: (e) => {
          throw e;
        },
        complete: () => {
          done();
        },
      });
    });
    it('should remove any password prop', (done: any) => {
      const payload = {
        password: 'pw',
        name: 'foobar',
      };
      const expected = {
        name: 'foobar',
      };
      mockNextHandle = jest.fn(() => of(payload));
      mockCallHandler = { handle: mockNextHandle };
      const result: Observable<any> = interceptor.intercept(
        mockContext,
        mockCallHandler
      );
      result.subscribe({
        next: (value) => {
          expect(value).toMatchObject(expected);
        },
        error: (e) => {
          throw e;
        },
        complete: () => {
          done();
        },
      });
    });
    it('should remove any isDeleted prop', (done: any) => {
      const payload = {
        isDeleted: true,
        name: 'foobar',
      };
      const expected = {
        name: 'foobar',
      };
      mockNextHandle = jest.fn(() => of(payload));
      mockCallHandler = { handle: mockNextHandle };
      const result: Observable<any> = interceptor.intercept(
        mockContext,
        mockCallHandler
      );
      result.subscribe({
        next: (value) => {
          expect(value).toMatchObject(expected);
        },
        error: (e) => {
          throw e;
        },
        complete: () => {
          done();
        },
      });
    });

    it('should remove any passwordVerification prop', (done: any) => {
      const payload = {
        name: 'foobar',
        passwordVerification: {},
      };
      const expected = {
        name: 'foobar',
      };
      mockNextHandle = jest.fn(() => of(payload));
      mockCallHandler = { handle: mockNextHandle };
      const result: Observable<any> = interceptor.intercept(
        mockContext,
        mockCallHandler
      );
      result.subscribe({
        next: (value) => {
          expect(value).toMatchObject(expected);
        },
        error: (e) => {
          throw e;
        },
        complete: () => {
          done();
        },
      });
    });
    it('should convert _id to string id if object', (done: any) => {
      const payload = {
        _id: { toString: () => 'baz' },
        name: 'foobar',
      };
      const expected = {
        id: 'baz',
        name: 'foobar',
      };
      mockNextHandle = jest.fn(() => of(payload));
      mockCallHandler = { handle: mockNextHandle };
      const result: Observable<any> = interceptor.intercept(
        mockContext,
        mockCallHandler
      );
      result.subscribe({
        next: (value) => {
          expect(value).toMatchObject(expected);
        },
        error: (e) => {
          throw e;
        },
        complete: () => {
          done();
        },
      });
    });
    it('should convert _id to string id if string', (done: any) => {
      const payload = {
        _id: 'baz',
        name: 'foobar',
      };
      const expected = {
        id: 'baz',
        name: 'foobar',
      };
      mockNextHandle = jest.fn(() => of(payload));
      mockCallHandler = { handle: mockNextHandle };
      const result: Observable<any> = interceptor.intercept(
        mockContext,
        mockCallHandler
      );
      result.subscribe({
        next: (value) => {
          expect(value).toMatchObject(expected);
        },
        error: (e) => {
          throw e;
        },
        complete: () => {
          done();
        },
      });
    });
    it('should remove props prefixed by _', (done: any) => {
      const payload = {
        _remove: 'potassium',
        _thisone: 'bananas',
        name: 'foobar',
      };
      const expected = {
        name: 'foobar',
      };
      mockNextHandle = jest.fn(() => of(payload));
      mockCallHandler = { handle: mockNextHandle };
      const result: Observable<any> = interceptor.intercept(
        mockContext,
        mockCallHandler
      );
      result.subscribe({
        next: (value) => {
          expect(value).toMatchObject(expected);
        },
        error: (e) => {
          throw e;
        },
        complete: () => {
          done();
        },
      });
    });
    it('should remove functions', (done: any) => {
      const payload = {
        _func: () => ({ name: 'foobar' }),
        name: 'foobar',
      };
      const expected = {
        name: 'foobar',
      };
      mockNextHandle = jest.fn(() => of(payload));
      mockCallHandler = { handle: mockNextHandle };
      const result: Observable<any> = interceptor.intercept(
        mockContext,
        mockCallHandler
      );
      result.subscribe({
        next: (value) => {
          expect(value).toMatchObject(expected);
        },
        error: (e) => {
          throw e;
        },
        complete: () => {
          done();
        },
      });
    });
    it('should remove props based on validators even on nested objects', (done: any) => {
      const payload = {
        name: 'foobar',
        _id: 'id',
        _omit: 'baz',
        password: 'foobar',
        obj: {
          child: 'foobar',
          _id: 'id',
          password: 'foobar',
        },
      };
      const expected = {
        name: 'foobar',
        obj: {
          child: 'foobar',
        },
      };
      mockNextHandle = jest.fn(() => of(payload));
      mockCallHandler = { handle: mockNextHandle };
      const result: Observable<any> = interceptor.intercept(
        mockContext,
        mockCallHandler
      );
      result.subscribe({
        next: (value) => {
          expect(value).toMatchObject(expected);
        },
        error: (e) => {
          throw e;
        },
        complete: () => {
          done();
        },
      });
    });
    it('should remove props from elements in an array based on validators', (done: any) => {
      const payload = [
        {
          name: 'foobar1',
          _id: 'id',
          _omit: 'baz',
          password: 'foobar',
          obj: {
            child: 'foobar1',
            _id: 'id',
            password: 'foobar',
          },
        },
        {
          name: 'foobar2',
          _id: 'id',
          _omit: 'baz',
          password: 'foobar',
          obj: {
            child: 'foobar2',
            _id: 'id',
            password: 'foobar',
          },
        },
      ];
      const expected = [
        {
          name: 'foobar1',
          obj: {
            child: 'foobar1',
          },
        },
        {
          name: 'foobar2',
          obj: {
            child: 'foobar2',
          },
        },
      ];
      mockNextHandle = jest.fn(() => of(payload));
      mockCallHandler = { handle: mockNextHandle };
      const result: Observable<any> = interceptor.intercept(
        mockContext,
        mockCallHandler
      );
      result.subscribe({
        next: (value) => {
          expect(value).toMatchObject(expected);
        },
        error: (e) => {
          throw e;
        },
        complete: () => {
          done();
        },
      });
    });
  });
});
