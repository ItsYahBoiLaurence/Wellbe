/* Using interface to allow child class
 * to define ApiProperty() values */
export interface PagedList<T> {
  items: T[];
  total: number;
}
