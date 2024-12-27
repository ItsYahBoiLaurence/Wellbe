import { Type } from '@nestjs/common';
import { SchemaFactory } from '@nestjs/mongoose';
import { TransformFnParams } from 'class-transformer';
import * as mongoose from 'mongoose';
import * as mongooseLeanVirtuals from 'mongoose-lean-virtuals';

export const objectIdTransform = (opts: TransformFnParams) => {
  if (!!opts.obj?.id) return opts.obj.id;
  return opts.obj?._id?.toString();
};

export const BaseEntitySchemaOptions: mongoose.SchemaOptions = {
  versionKey: false,
  strict: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
};

const virtuals = {
  id: function () {
    return this._id.toString() as string;
  },
};

export const createSchemaForEntity = (
  target: Type<unknown>
): mongoose.Schema<any> => {
  const schema = SchemaFactory.createForClass(target);
  schema.plugin(mongooseLeanVirtuals as any);
  schema.virtual('id', virtuals.id);
  return schema;
};
