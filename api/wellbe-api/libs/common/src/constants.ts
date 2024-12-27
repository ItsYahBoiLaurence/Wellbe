import { HttpStatus } from '@nestjs/common';

export const HELPERS_CONFIG_OPTIONS = 'HELPERS_CONFIG_OPTIONS';
export const DEFAULT_ERROR_STATUS_CODE = HttpStatus.BAD_REQUEST;
export const DECORATOR_METADATA = {
  ownerId: 'ownerId',
  public: 'isPublic',
  roles: 'roles',
  user: 'user',
};

export enum ControllerParams {
  search = 'q',
  filter = 'filter',
  skip = 'skip',
  limit = 'limit',
  sort = 'sort',
  UrlUserId = 'userId',
  Id = 'id',
}

export const ApiPropertyParams = {
  SEARCH: { name: ControllerParams.search, required: true },
  FILTER: { name: ControllerParams.filter, required: false },
  SKIP: { name: ControllerParams.skip, required: false },
  LIMIT: { name: ControllerParams.limit, required: false },
  SORT: { name: ControllerParams.sort, required: false },
  USER_ID: { name: ControllerParams.UrlUserId, description: 'ID of the user' },
  ID: { name: ControllerParams.Id, description: 'ID of entity' },
};

export const ACTIVITY_TRACKER_CONFIG_OPTIONS =
  'ACTIVITY_TRACKER_CONFIG_OPTIONS';

export const HeaderNames = {
  CORRELATION_ID: 'x-correlation-id',
};
