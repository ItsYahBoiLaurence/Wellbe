enum BaseErrors {
  UNHANDLED_ERROR = 'unhandled_error',
  INVALID_ARGUMENTS = 'invalid_arguments',
  CONNECTION_TIMEOUT = 'connection_timeout',
  NOT_FOUND = 'not_found',
  EMPTY_RESPONSE = 'empty_response',
  FAILED_TO_CREATE_RESOURCE = 'failed_to_create_resource',
  FAILED_TO_UPDATE_RESOURCE = 'failed_to_update_resource',
  FAILED_TO_DELETE_RESOURCE = 'failed_to_delete_resource',
  ALREADY_EXISTS = 'already_exists',
  UNAUTHORIZED = 'unauthorized',
  FORBIDDEN = 'forbidden',
  VALIDATION_ERROR = 'validation_error',
  INVALID_CREDENTIALS = 'invalid_credentials',
}

export { BaseErrors };
