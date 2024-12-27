import { CommonModulePlatform } from '../common-config-options';
import { RequestSanitizerInterceptor } from './request-sanitizer.interceptor';

jest.mock('@golevelup/nestjs-rabbitmq', () => ({
  ...(jest.requireActual('@golevelup/nestjs-rabbitmq') as any),
  isRabbitContext: jest.fn().mockResolvedValue(false),
}));

describe('ExceptionInterceptor', () => {
  let mockCallHandler;
  let mockRequest;
  let mockContext;
  let mockHttp;

  describe('constructor', () => {
    it('should be defined', () => {
      const interceptor = new RequestSanitizerInterceptor({
        platform: CommonModulePlatform.EXPRESS,
      });
      expect(interceptor).toBeDefined();
    });
  });

  describe('intercept', () => {
    const handleFastifyIntercept =
      RequestSanitizerInterceptor.handleFastifyIntercept;
    const handleExpressIntercept =
      RequestSanitizerInterceptor.handleExpressIntercept;

    beforeEach(() => {
      RequestSanitizerInterceptor.handleFastifyIntercept = jest
        .fn()
        .mockResolvedValue({});
      RequestSanitizerInterceptor.handleExpressIntercept = jest
        .fn()
        .mockResolvedValue({});
    });

    afterEach(() => {
      RequestSanitizerInterceptor.handleFastifyIntercept =
        handleFastifyIntercept;
      RequestSanitizerInterceptor.handleExpressIntercept =
        handleExpressIntercept;
    });

    it('should call handleFastifyIntercept for fastify platform', async () => {
      const interceptor = new RequestSanitizerInterceptor({
        platform: CommonModulePlatform.FASTIFY,
      });
      await interceptor.intercept(mockContext, mockCallHandler);
      expect(RequestSanitizerInterceptor.handleFastifyIntercept).toBeCalled();
    });
    it('should call handleFastifyIntercept for express platform', async () => {
      const interceptor = new RequestSanitizerInterceptor({
        platform: CommonModulePlatform.EXPRESS,
      });
      await interceptor.intercept(mockContext, mockCallHandler);
      expect(RequestSanitizerInterceptor.handleExpressIntercept).toBeCalled();
    });
  });

  describe('handleExpressIntercept', () => {
    beforeEach(() => {
      mockRequest = {
        body: {},
        method: 'GET',
      };
      mockHttp = {
        getRequest: jest.fn(() => mockRequest),
      };
      mockContext = {
        switchToHttp: jest.fn(() => mockHttp),
      };
      mockCallHandler = { handle: jest.fn() };
      RequestSanitizerInterceptor.getRawBody = jest.fn().mockResolvedValue({
        toString: () => JSON.stringify({ name: 'foobar' }),
      });
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should not change request body if not POST method', async () => {
      await RequestSanitizerInterceptor.handleExpressIntercept(
        mockContext,
        mockCallHandler
      );
      expect(mockRequest.body).toMatchObject({});
    });
    it('should change string body to object', async () => {
      mockRequest = {
        body: JSON.stringify({ name: 'foobar' }),
        method: 'POST',
      };
      mockHttp = {
        getRequest: jest.fn(() => mockRequest),
      };
      mockContext = {
        switchToHttp: jest.fn(() => mockHttp),
      };
      await RequestSanitizerInterceptor.handleExpressIntercept(
        mockContext,
        mockCallHandler
      );
      expect(mockRequest.body).toMatchObject({ name: 'foobar' });
    });
    it('should change non multipart/form-data body to object', async () => {
      mockRequest = {
        readable: true,
        headers: {
          'content-type': ['application/json'],
        },
        body: { name: 'foobar' },
        method: 'POST',
      };
      mockHttp = {
        getRequest: jest.fn(() => mockRequest),
      };
      mockContext = {
        switchToHttp: jest.fn(() => mockHttp),
      };
      await RequestSanitizerInterceptor.handleExpressIntercept(
        mockContext,
        mockCallHandler
      );
      expect(mockRequest.body).toMatchObject({ name: 'foobar' });
    });
  });

  describe('handleFastifyIntercept', () => {
    beforeEach(() => {
      mockRequest = {
        raw: {
          method: 'GET',
        },
        body: {},
      };
      mockHttp = {
        getRequest: jest.fn(() => mockRequest),
      };
      mockContext = {
        switchToHttp: jest.fn(() => mockHttp),
      };
      mockCallHandler = { handle: jest.fn() };
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should not change request body if not POST method', async () => {
      await RequestSanitizerInterceptor.handleFastifyIntercept(
        mockContext,
        mockCallHandler
      );
      expect(mockRequest.body).toMatchObject({});
    });
    it('should change string body to object', async () => {
      mockRequest = {
        raw: {
          method: 'POST',
        },
        body: JSON.stringify({ name: 'foobar' }),
      };
      mockHttp = {
        getRequest: jest.fn(() => mockRequest),
      };
      mockContext = {
        switchToHttp: jest.fn(() => mockHttp),
      };
      await RequestSanitizerInterceptor.handleFastifyIntercept(
        mockContext,
        mockCallHandler
      );
      expect(mockRequest.body).toMatchObject({ name: 'foobar' });
    });
  });

  describe('isMultipartFormData', () => {
    it('should return false if there are no headers', async () => {
      const result = RequestSanitizerInterceptor.isMultipartFormData(null);
      expect(result).toBe(false);
    });
    it('should return true if multipart/form-data header is present', async () => {
      const request = {
        headers: {
          'content-type': ['multipart/form-data'],
        },
      };
      const result = RequestSanitizerInterceptor.isMultipartFormData(
        request as any
      );
      expect(result).toBe(true);
    });
    it('should return false if multipart/form-data header is not found', async () => {
      const request = {
        headers: {
          'content-type': ['application/json'],
        },
      };
      const result = RequestSanitizerInterceptor.isMultipartFormData(
        request as any
      );
      expect(result).toBe(false);
    });
  });
});
