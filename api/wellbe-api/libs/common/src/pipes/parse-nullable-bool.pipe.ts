import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class ParseNullableBoolPipe implements PipeTransform {
  transform(value: boolean | string | null | undefined) {
    if (typeof value === 'string') {
      const stringValue = value.toLowerCase();
      return stringValue === 'true' ? true : false;
    }
    return value;
  }
}
