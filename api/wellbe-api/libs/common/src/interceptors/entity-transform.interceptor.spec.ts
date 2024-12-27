import { Exclude } from 'class-transformer';
import { Observable, of } from 'rxjs';
import { EntityTransformInterceptor } from './entity-transform.interceptor';

jest.mock('@golevelup/nestjs-rabbitmq', () => ({
  ...(jest.requireActual('@golevelup/nestjs-rabbitmq') as any),
  isRabbitContext: jest.fn().mockResolvedValue(false),
}));

class TestClass {
  name: string;

  @Exclude()
  excludedField: string;

  _prefixedField: string;

  nested?: TestClass;
}

describe('EntityTransformInterceptor', () => {
  let mockCallHandler;
  let mockNextHandle;
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
    mockNextHandle = jest.fn(() => of(null));
    mockCallHandler = { handle: mockNextHandle };
    interceptor = new EntityTransformInterceptor(TestClass);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should be defined', () => {
      expect(interceptor).toBeDefined();
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
    it('should remove excluded fields', (done: any) => {
      const payload: TestClass = {
        name: 'foobar',
        excludedField: 'barbaz',
        _prefixedField: 'foobaz',
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
    it('should handle nested objects', (done: any) => {
      const payload: TestClass = {
        name: 'foobar',
        excludedField: 'barbaz',
        _prefixedField: 'foobaz',
        nested: {
          name: 'foobar',
          excludedField: 'barbaz',
          _prefixedField: 'foobaz',
        },
      };
      const expected = {
        name: 'foobar',
        nested: {
          name: 'foobar',
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
    it('should handle arrays', (done: any) => {
      const payload: TestClass[] = [
        {
          name: 'foobar1',
          excludedField: 'barbaz',
          _prefixedField: 'foobaz',
          nested: {
            name: 'foobar1',
            excludedField: 'barbaz',
            _prefixedField: 'foobaz',
          },
        },
        {
          name: 'foobar2',
          excludedField: 'barbaz',
          _prefixedField: 'foobaz',
          nested: {
            name: 'foobar2',
            excludedField: 'barbaz',
            _prefixedField: 'foobaz',
          },
        },
      ];
      const expected = [
        {
          name: 'foobar1',
          nested: {
            name: 'foobar1',
          },
        },
        {
          name: 'foobar2',
          nested: {
            name: 'foobar2',
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
