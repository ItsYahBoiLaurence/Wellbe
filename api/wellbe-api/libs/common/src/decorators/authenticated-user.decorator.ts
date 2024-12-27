import { createParamDecorator } from '@nestjs/common';

import { getDataFromToken } from '../utils';

/**
 * Gets authenticated user id of the current request
 * If not authenticated, it will return null
 */
export const AuthenticatedUser = createParamDecorator(getDataFromToken);
