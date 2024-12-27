import { HttpException } from '@nestjs/common';
import { ErrorInfo } from './error-info.entity';

export class AppException extends HttpException {
  statusCode: number;
  type?: string;

  constructor(error: ErrorInfo, data?: any) {
    super(data, undefined);
    const { message, type, statusCode } = error;
    this.message = message;
    this.statusCode = statusCode;
    this.type = type;
  }
}
