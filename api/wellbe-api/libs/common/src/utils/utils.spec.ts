import { dateTransformToUnix } from './utils';

describe('utils', () => {
  const mockDate = new Date('2022-03-24T00:00:00');

  describe('dateTransformToUnix', () => {
    it('should return null if value is empty', () => {
      const result = dateTransformToUnix({ value: null } as any);
      expect(result).toBe(null);
    });
    it('should return time if value is already number', () => {
      const result = dateTransformToUnix({ value: mockDate.getTime() } as any);
      expect(result).toBe(mockDate.getTime());
    });
    it('should return time if value is Date', () => {
      const result = dateTransformToUnix({ value: mockDate } as any);
      expect(result).toBe(mockDate.getTime());
    });
    it('should return time if value is string', () => {
      const result = dateTransformToUnix({
        value: '2022-03-24T00:00:00',
      } as any);
      expect(result).toBe(mockDate.getTime());
    });
    it('should return null if string date is invalid', () => {
      const result = dateTransformToUnix({ value: 'invalid' } as any);
      expect(result).toBe(null);
    });
  });
});
