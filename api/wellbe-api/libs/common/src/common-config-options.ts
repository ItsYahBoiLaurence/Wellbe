export enum CommonModulePlatform {
  EXPRESS = 'express',
  FASTIFY = 'fastify',
}

export interface CommonConfigOptions {
  platform: CommonModulePlatform;
  applyInterceptors?: boolean;
  applyFilters?: boolean;
}
