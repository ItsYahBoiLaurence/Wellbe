import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  Type,
} from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { InvalidArgumentsError, ValidationError } from '@x/common';
import * as multer from 'multer';
import { transformException } from '../multer';

type MulterInstance = any;

export const FileValidationGuard = (
  fieldName: string,
  localOptions?: MulterOptions
): Type<CanActivate> => {
  @Injectable()
  class FileValidationGuardMixin implements CanActivate {
    protected multer: MulterInstance;
    constructor() {
      this.multer = (multer as any)({
        ...localOptions,
      });
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
      if (!fieldName) {
        throw new InvalidArgumentsError('fieldName is required');
      }
      const ctx = context.switchToHttp();
      const request = ctx.getRequest();
      await new Promise<void>((resolve, reject) =>
        this.multer.single(fieldName)(
          ctx.getRequest(),
          ctx.getResponse(),
          (err: any) => {
            if (err) {
              const error = transformException(err);
              return reject(error);
            }
            resolve();
          }
        )
      );

      const file = request.file;
      if (!file)
        throw new ValidationError('File format not supported').exception;

      return true;
    }
  }
  return mixin(FileValidationGuardMixin);
};
