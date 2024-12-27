import { SetMetadata } from '@nestjs/common';
import { DECORATOR_METADATA } from '../constants';

export type OwnerIdOptions = {
  requestKey: string;
  userKey: string;
};

export const OwnerId = (opts: OwnerIdOptions) =>
  SetMetadata(DECORATOR_METADATA.ownerId, opts);
