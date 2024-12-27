import { Type } from '@nestjs/common';
import { SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const BaseEntitySchemaOptions: mongoose.SchemaOptions = {
  versionKey: false,
  strict: true,
  timestamps: {
    createdAt: 'createdDate',
    updatedAt: 'modifiedDate',
  },
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
};

const BaseEntitySchema: mongoose.Schema = new mongoose.Schema(
  {
    createdBy: String,
    modifiedBy: String,
  },
  BaseEntitySchemaOptions
);

const virtuals = {
  id: function () {
    return this._id.toString() as string;
  },
};

const createSchemaForEntity = (target: Type<unknown>): mongoose.Schema<any> => {
  const schema = SchemaFactory.createForClass(target);
  schema.plugin(mongooseLeanVirtuals as any);
  schema.virtual('id', virtuals.id);
  return schema;
};

export { BaseEntitySchema, BaseEntitySchemaOptions, createSchemaForEntity };
