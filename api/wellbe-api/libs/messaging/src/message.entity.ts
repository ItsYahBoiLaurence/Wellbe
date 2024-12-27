export interface Message<T> {
  payload: T;
  retry?: number;
}
