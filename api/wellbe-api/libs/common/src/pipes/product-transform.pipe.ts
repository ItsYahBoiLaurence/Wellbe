import { PipeTransform, Injectable } from '@nestjs/common';
import { Product } from '../models';

@Injectable()
export class ProductTransformPipe implements PipeTransform {
  transform(value: string) {
    const productKey = Object.values(Product).includes(value as Product)
      ? (value as Product)
      : undefined;
    return productKey;
  }
}
