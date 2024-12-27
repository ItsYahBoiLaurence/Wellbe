import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  BaseEntitySchemaOptions,
  createSchemaForEntity,
  objectIdTransform,
} from '@x/common';
import { Expose, Transform, Type } from 'class-transformer';
import { Types } from 'mongoose';
import { Company, CompanyEntity } from '../companies';

@Schema({ collection: 'Departments', ...BaseEntitySchemaOptions })
export class DepartmentEntity {
  @ApiProperty()
  @Expose()
  @Transform(objectIdTransform)
  id?: string;

  @ApiProperty()
  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId })
  @ApiProperty({ type: String })
  @Type(() => CompanyEntity)
  company: Company | Types.ObjectId | String;
}

export type Department = DepartmentEntity & BaseEntity;
const DepartmentSchema = createSchemaForEntity(DepartmentEntity);
export { DepartmentSchema };
