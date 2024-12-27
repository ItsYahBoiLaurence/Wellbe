import { Schema } from 'mongoose';

export function extendSchema(
  schema: Schema,
  definition: object,
  options: object
) {
  return new Schema({ ...schema.obj, ...definition }, options);
}
