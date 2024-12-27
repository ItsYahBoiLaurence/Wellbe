import { SetMetadata } from '@nestjs/common';
import { DECORATOR_METADATA } from '../constants';

export const Public = () => SetMetadata(DECORATOR_METADATA.public, true);
