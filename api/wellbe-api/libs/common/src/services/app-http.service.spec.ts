import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '@x/logging';
import { AppException, UnhandledError } from '../models';
import { AppHttpService } from './app-http.service';

describe('AppHttpService', () => {
  interface MockHttpService {
    get: jest.Mock<any>;
    post: jest.Mock<any>;
    put: jest.Mock<any>;
    patch: jest.Mock<any>;
    delete: jest.Mock<any>;
  }

  interface MockLoggerService {
    error: jest.Mock<void>;
  }

  let mockHttpService: MockHttpService;
  let mockLoggerService: MockLoggerService;
  let service: AppHttpService;

  beforeEach(async () => {
    mockHttpService = {
      get: jest.fn().mockReturnValue({
        toPromise: jest.fn().mockResolvedValue({ data: { name: 'foobar' } }),
      }),
      post: jest.fn().mockReturnValue({
        toPromise: jest.fn().mockResolvedValue({ data: { name: 'foobar' } }),
      }),
      put: jest.fn().mockReturnValue({
        toPromise: jest.fn().mockResolvedValue({ data: { name: 'foobar' } }),
      }),
      delete: jest.fn().mockReturnValue({
        toPromise: jest.fn().mockResolvedValue({ data: { name: 'foobar' } }),
      }),
      patch: jest.fn().mockReturnValue({
        toPromise: jest.fn().mockResolvedValue({ data: { name: 'foobar' } }),
      }),
    };

    mockLoggerService = {
      error: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppHttpService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
        {
          provide: LoggerService,
          useValue: mockLoggerService,
        },
      ],
    }).compile();

    service = module.get<AppHttpService>(AppHttpService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('get', () => {
    it('should call HttpService.get and return result successfully', async () => {
      const result = await service.get('url');
      expect(mockHttpService.get).toBeCalledWith(
        'url',
        expect.objectContaining({
          headers: expect.objectContaining({
            'x-correlation-id': expect.any(String),
          }),
        })
      );
      expect(result).toMatchObject({ name: 'foobar' });
    });
    it('should return same error from external service', async () => {
      mockHttpService.get.mockReturnValue({
        toPromise: jest.fn().mockRejectedValue({
          response: {
            data: {
              message: 'error',
              statusCode: 400,
            },
          },
        }),
      });
      expect(() => service.get('url')).rejects.toThrowError(
        new AppException({
          message: 'error',
          statusCode: 400,
        })
      );
    });
    it('should return UnhandledError if no error response', async () => {
      mockHttpService.get.mockReturnValue({
        toPromise: jest.fn().mockRejectedValue({
          message: 'error',
          statusCode: 500,
        }),
      });
      expect(() => service.get('url')).rejects.toThrowError(
        new UnhandledError().exception
      );
    });
  });

  describe('delete', () => {
    it('should call HttpService.delete and return result successfully', async () => {
      const result = await service.delete('url');
      expect(mockHttpService.delete).toBeCalledWith(
        'url',
        expect.objectContaining({
          headers: expect.objectContaining({
            'x-correlation-id': expect.any(String),
          }),
        })
      );
      expect(result).toMatchObject({ name: 'foobar' });
    });
    it('should return same error from external service', async () => {
      mockHttpService.delete.mockReturnValue({
        toPromise: jest.fn().mockRejectedValue({
          response: {
            data: {
              message: 'error',
              statusCode: 400,
            },
          },
        }),
      });
      expect(() => service.delete('url')).rejects.toThrowError(
        new AppException({
          message: 'error',
          statusCode: 400,
        })
      );
    });
    it('should return UnhandledError if no error response', async () => {
      mockHttpService.delete.mockReturnValue({
        toPromise: jest.fn().mockRejectedValue({
          message: 'error',
          statusCode: 500,
        }),
      });
      expect(() => service.delete('url')).rejects.toThrowError(
        new UnhandledError().exception
      );
    });
  });

  describe('post', () => {
    it('should call HttpService.post and return result successfully', async () => {
      const result = await service.post('url', {});
      expect(mockHttpService.post).toBeCalledWith(
        'url',
        {},
        expect.objectContaining({
          headers: expect.objectContaining({
            'x-correlation-id': expect.any(String),
          }),
        })
      );
      expect(result).toMatchObject({ name: 'foobar' });
    });
    it('should return same error from external service', async () => {
      mockHttpService.post.mockReturnValue({
        toPromise: jest.fn().mockRejectedValue({
          response: {
            data: {
              message: 'error',
              statusCode: 400,
            },
          },
        }),
      });
      expect(() => service.post('url', {})).rejects.toThrowError(
        new AppException({
          message: 'error',
          statusCode: 400,
        })
      );
    });
    it('should return UnhandledError if no error response', async () => {
      mockHttpService.post.mockReturnValue({
        toPromise: jest.fn().mockRejectedValue({
          message: 'error',
          statusCode: 500,
        }),
      });
      expect(() => service.post('url', {})).rejects.toThrowError(
        new UnhandledError().exception
      );
    });
  });

  describe('put', () => {
    it('should call HttpService.put and return result successfully', async () => {
      const result = await service.put('url', {});
      expect(mockHttpService.put).toBeCalledWith(
        'url',
        {},
        expect.objectContaining({
          headers: expect.objectContaining({
            'x-correlation-id': expect.any(String),
          }),
        })
      );
      expect(result).toMatchObject({ name: 'foobar' });
    });
    it('should return same error from external service', async () => {
      mockHttpService.put.mockReturnValue({
        toPromise: jest.fn().mockRejectedValue({
          response: {
            data: {
              message: 'error',
              statusCode: 400,
            },
          },
        }),
      });
      expect(() => service.put('url', {})).rejects.toThrowError(
        new AppException({
          message: 'error',
          statusCode: 400,
        })
      );
    });
    it('should return UnhandledError if no error response', async () => {
      mockHttpService.put.mockReturnValue({
        toPromise: jest.fn().mockRejectedValue({
          message: 'error',
          statusCode: 500,
        }),
      });
      expect(() => service.put('url', {})).rejects.toThrowError(
        new UnhandledError().exception
      );
    });
  });

  describe('patch', () => {
    it('should call HttpService.patch and return result successfully', async () => {
      const result = await service.patch('url', {});
      expect(mockHttpService.patch).toBeCalledWith(
        'url',
        {},
        expect.objectContaining({
          headers: expect.objectContaining({
            'x-correlation-id': expect.any(String),
          }),
        })
      );
      expect(result).toMatchObject({ name: 'foobar' });
    });
    it('should return same error from external service', async () => {
      mockHttpService.patch.mockReturnValue({
        toPromise: jest.fn().mockRejectedValue({
          response: {
            data: {
              message: 'error',
              statusCode: 400,
            },
          },
        }),
      });
      expect(() => service.patch('url', {})).rejects.toThrowError(
        new AppException({
          message: 'error',
          statusCode: 400,
        })
      );
    });
    it('should return UnhandledError if no error response', async () => {
      mockHttpService.patch.mockReturnValue({
        toPromise: jest.fn().mockRejectedValue({
          message: 'error',
          statusCode: 500,
        }),
      });
      expect(() => service.patch('url', {})).rejects.toThrowError(
        new UnhandledError().exception
      );
    });
  });
});
