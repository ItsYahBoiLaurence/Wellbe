import { FilterQueryOptions } from './filter-query-options.entity';

export interface SearchQueryOptions<T> extends FilterQueryOptions<T> {
  q: string;
}
