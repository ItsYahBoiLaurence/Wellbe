import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isArray, isObject } from 'lodash';
import { LoggerService } from '@x/logging';

interface Validator {
  validate: (obj: any, prop: string) => boolean;
  recurse: boolean;
  delete: boolean;
  replace?: (obj: any, prop: string) => any;
}

@Injectable()
export class EntitySanitizerInterceptor implements NestInterceptor {
  validators: Validator[] = [];

  constructor(private logger: LoggerService) {
    this.initializeValidators();
  }

  initializeValidators() {
    this.validators = [
      {
        validate: (obj, prop) => prop === 'password',
        recurse: false,
        delete: true,
      },
      {
        validate: (obj, prop) => prop === 'isDeleted',
        recurse: false,
        delete: true,
      },
      {
        validate: (obj, prop) => prop === 'passwordVerification',
        recurse: false,
        delete: true,
      },
      {
        validate: (obj, prop) => prop === '_id',
        recurse: false,
        delete: false,
        replace: (obj, prop) => {
          if (typeof obj[prop] === 'object') {
            obj.id = obj[prop].toString();
            delete obj[prop];
          } else {
            obj.id = obj[prop];
            delete obj[prop];
          }
        },
      },
      {
        validate: (obj, prop) => /^_/.test(prop),
        recurse: false,
        delete: true,
      },
      {
        validate: (obj, prop) => typeof obj[prop] === 'function',
        recurse: false,
        delete: true,
      },
      {
        validate: (obj, prop) => typeof obj[prop] === 'object',
        recurse: true,
        delete: false,
      },
    ];
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((result) => {
        if (!result) return null;

        const clean = (object) => {
          if (!object) return null;
          Object.keys(object).forEach((prop) => {
            this.validators.some((v) => {
              try {
                if (!v.validate(object, prop)) return false;
                if (v.delete) {
                  delete object[prop];
                  return false;
                }
                if (v.recurse) {
                  object[prop] = clean(object[prop]);
                  return false;
                }
                if (v.replace) {
                  v.replace(object, prop);
                  return false;
                }
                return true;
              } catch (error) {
                this.logger.error(`Transform error for ${prop}`, error);
                return false;
              }
            });
          });
          return object;
        };

        if (isArray(result)) result.forEach((o) => clean(o));
        if (isObject(result)) clean(result);
        return result;
      })
    );
  }
}
