import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseStatus } from './enums';

/**
 * Use for standard provider/controller responses
 * ex: AppResponse.success()
 */
export class AppResponse {
  constructor(type: ResponseStatus, message?: string, statusCode?: number) {
    this.type = type;
    this.message = message;
    this.statusCode = statusCode;
  }

  @ApiProperty()
  type: ResponseStatus;

  @ApiProperty()
  message?: string;

  @ApiProperty()
  statusCode?: number;

  static success(msg?: string, statusCode?: number): AppResponse {
    return new AppResponse(
      ResponseStatus.SUCCESS,
      msg,
      statusCode ?? HttpStatus.OK
    );
  }

  static failed(msg?: string, statusCode?: number): AppResponse {
    return new AppResponse(
      ResponseStatus.FAILED,
      msg,
      statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
