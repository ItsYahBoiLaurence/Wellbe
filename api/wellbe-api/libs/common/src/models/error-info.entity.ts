import * as _ from 'lodash';
import { ApiProperty } from '@nestjs/swagger';
import { DEFAULT_ERROR_STATUS_CODE } from '../constants';

export class ErrorInfo {
  @ApiProperty()
  public type?: string;

  @ApiProperty()
  public message?: string;

  @ApiProperty()
  public statusCode?: number;

  constructor(errorType?: string, message?: string, statusCode?: number) {
    if (!_.isNil(errorType)) this.type = errorType;
    this.message = message ?? this.type;
    this.statusCode = statusCode ?? DEFAULT_ERROR_STATUS_CODE;
  }
}
