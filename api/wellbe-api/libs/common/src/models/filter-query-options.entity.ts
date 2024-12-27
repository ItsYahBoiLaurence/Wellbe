import { FilterQuery } from 'mongoose';

export class FilterQueryOptions<T> {
  filter?: FilterQuery<T>;
  sort?: any;
  skip?: number;
  limit?: number;
}
