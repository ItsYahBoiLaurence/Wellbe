import { ExecutionContext } from '@nestjs/common';
import { getDataFromToken } from '../utils';

jest.mock('jwt-decode', () => ({
  default: jest.fn().mockReturnValue({ id: 'id' }),
}));

describe('AuthenticatedUser', () => {
  let mockContext, mockHttp, mockRequest;

  beforeEach(async () => {
    mockRequest = { user: { id: 'id' } };
    mockHttp = {
      getRequest: jest.fn().mockReturnValue(mockRequest),
    };
    mockContext = {
      switchToHttp: jest.fn().mockReturnValue(mockHttp),
    } as unknown as ExecutionContext;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('authenticatedUserIdHandler', () => {
    it('should return null if request is undefined', () => {
      mockHttp.getRequest.mockReturnValue(null);
      const result = getDataFromToken('id', mockContext);
      expect(result).toBe(null);
    });
    it('should return null if request.user is undefined', () => {
      mockHttp.getRequest.mockReturnValue({ user: null });
      const result = getDataFromToken('id', mockContext);
      expect(result).toBe(null);
    });
    it('should return user id successfully', () => {
      const result = getDataFromToken('id', mockContext);
      expect(result).toBe('id');
    });
    it('should return full user if key not provided', () => {
      const result = getDataFromToken(undefined, mockContext);
      expect(result).toMatchObject({ id: 'id' });
    });
    it('should return user from token if exists', () => {
      mockHttp.getRequest.mockReturnValue({
        user: null,
        headers: {
          authorization: 'Bearer foobar',
        },
      });
      const result = getDataFromToken('id', mockContext);
      expect(result).toBe('id');
    });
    it('should return full user from token if key not provided', () => {
      mockHttp.getRequest.mockReturnValue({
        user: null,
        headers: {
          authorization: 'Bearer foobar',
        },
      });
      const result = getDataFromToken(undefined, mockContext);
      expect(result).toMatchObject({ id: 'id' });
    });
    it('should return null if user and headers are null', () => {
      mockHttp.getRequest.mockReturnValue({ user: null, headers: null });
      const result = getDataFromToken('id', mockContext);
      expect(result).toBe(null);
    });
    it('should return null if authorization header is not valid', () => {
      mockHttp.getRequest.mockReturnValue({
        user: null,
        headers: {
          authorization: 'invalid',
        },
      });
      const result = getDataFromToken('id', mockContext);
      expect(result).toBe(null);
    });
  });
});
