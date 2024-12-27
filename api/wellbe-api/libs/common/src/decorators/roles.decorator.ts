import { SetMetadata } from '@nestjs/common';
import { DECORATOR_METADATA } from '../constants';

export const Roles = (...roles: string[]) =>
  SetMetadata(DECORATOR_METADATA.roles, roles);
