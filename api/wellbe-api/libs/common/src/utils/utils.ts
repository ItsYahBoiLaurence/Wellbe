import { ExecutionContext } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';
import { Request } from 'express';
import { jwtDecode } from 'jwt-decode';
import { AuthTokenPayload } from '../models';

const isDateValid = (date: Date) => {
  return (
    Object.prototype.toString.call(date) === '[object Date]' &&
    !isNaN(date as any)
  );
};

export const nullableEnumValues = (type: any) => {
  return [undefined, null, '', ...Object.values(type)];
};

export const getObjectValueByStringPath = <T>(obj: T, path: string) => {
  return path.split('.').reduce((obj, i) => obj[i], obj);
};

export const objectIdTransform = (opts: TransformFnParams) => {
  if (!!opts.obj?.id) return opts.obj.id;
  return opts.obj?._id?.toString();
};

export const boolTransform = (opts: TransformFnParams) => {
  const { value } = opts;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  return !!value;
};

export const dateTransformToUnix = (opts: TransformFnParams) => {
  const { value } = opts;
  if (!value) return null;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const date = new Date(value) as any;
    return isDateValid(date) ? date.getTime() : null;
  }
  if (isDateValid(value)) return value.getTime();
  return null;
};

export function flattenObj(obj: any, parent: any = null, res: any = {}) {
  const isDate = (propValue: any) => typeof propValue?.getMonth === 'function';
  const isArray = (propValue: any) => Array.isArray(propValue);
  const isObject = (propValue: any) => typeof propValue === typeof {};

  for (const key in obj) {
    const propName = parent ? parent + '.' + key : key;
    const propValue = obj[key];
    if (isObject(propValue) && !isArray(propValue) && !isDate(propValue)) {
      flattenObj(propValue, propName, res);
    } else {
      res[propName] = propValue;
    }
  }
  return res;
}

export function toArray(obj: any) {
  return Array.isArray(obj) ? obj : [obj];
}

export function getDataFromToken(
  key: keyof AuthTokenPayload,
  ctx: ExecutionContext
) {
  const request = ctx.switchToHttp().getRequest<Request>();
  if (!request) return null;
  const user = request['user'];
  if (user) {
    return !!key ? user[key] : user;
  }

  // Grab user by decoding authorization token if exists
  if (!request?.headers?.authorization) return null;
  const { authorization } = request.headers;
  if (!/Bearer [A-Za-z0-9\-\._~\+\/]+=*/.test(authorization)) {
    return null;
  }

  const token = authorization.replace('Bearer ', '');
  if (!token || token === 'undefined' || token === 'null') return null;

  const userFromToken = jwtDecode(token);
  if (!userFromToken) return null;

  return !!key ? userFromToken[key] : userFromToken;
}

export function getDataDictionaryPipelines(
  localField: string,
  projectAs: string
) {
  return [
    {
      $lookup: {
        from: 'DataDictionaries',
        let: { localFieldId: localField },
        pipeline: [
          {
            $addFields: {
              id: {
                $toString: '$_id',
              },
            },
          },
          {
            $match: {
              $expr: {
                $eq: ['$id', '$$localFieldId'],
              },
            },
          },
          {
            $project: {
              id: 1,
              products: 1,
              group: 1,
              key: 1,
              label: 1,
            },
          },
        ],
        as: projectAs,
      },
    },
    {
      $unwind: {
        path: `$${projectAs}`,
        preserveNullAndEmptyArrays: true,
      },
    },
  ];
}
