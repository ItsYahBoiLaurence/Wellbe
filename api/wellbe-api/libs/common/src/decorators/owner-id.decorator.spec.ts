import { OwnerId } from './owner-id.decorator';
import { SetMetadata } from '@nestjs/common';
import { DECORATOR_METADATA } from '../constants';

jest.mock('../constants', () => ({
  DECORATOR_METADATA: {
    ownerId: 'test',
  },
}));

jest.mock('@nestjs/common', () => ({
  SetMetadata: jest.fn(),
}));

describe('OwnerId', () => {
  test('should call SetMetadata with correct parameters', () => {
    const params = {
      requestKey: 'requestKey',
      userKey: 'userKey',
    };
    OwnerId(params);
    expect(SetMetadata).toHaveBeenCalledWith(
      DECORATOR_METADATA.ownerId,
      params
    );
  });
});
