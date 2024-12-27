import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface';
import { Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { EntityMetadata } from '../models';

@Injectable()
export class EntityTransformInterceptor<T> implements NestInterceptor {
  constructor(
    private type: new () => T,
    private opts?: ClassTransformOptions
  ) {}

  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((result: EntityMetadata<any>) => {
        if (!result) return null;
        if (result.error) return result;

        const opts: ClassTransformOptions = {
          enableImplicitConversion: true,
          excludePrefixes: ['_'],
          ...this.opts,
        };

        const { data } = result;
        let obj = data;
        try {
          obj = plainToClass(this.type, obj, opts);
        } catch (error) {}

        result.data = obj;
        return result;
      })
    );
  }
}
