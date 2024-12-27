import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  BaseEntitySchemaOptions,
  createSchemaForEntity,
  objectIdTransform,
  ValidationError,
} from '@x/common';
import { Expose, Transform, Type } from 'class-transformer';
import { Types } from 'mongoose';
import { Department, DepartmentEntity } from '../departments';
import { Company, CompanyEntity } from '../companies';
import { IsDefined } from 'class-validator';

export type EmployeeStatus = 'active' | 'inactive';

@Schema({ collection: 'Employees', ...BaseEntitySchemaOptions })
export class EmployeeEntity {
  @ApiProperty()
  @Expose()
  @Transform(objectIdTransform)
  id?: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  @IsDefined()
  cognitoSub: string;

  @ApiProperty()
  @Prop()
  firstName?: string;

  @ApiProperty()
  @Prop()
  lastName?: string;

  @ApiProperty()
  @Prop()
  employeeId?: string;

  @Prop({ type: Types.ObjectId })
  @ApiProperty({ type: String })
  @Type(() => DepartmentEntity)
  department?: Department | Types.ObjectId | String;

  @Prop({ type: Types.ObjectId })
  @ApiProperty({ type: String })
  @Type(() => CompanyEntity)
  company: Company | Types.ObjectId | String;

  @ApiProperty()
  @Prop()
  contactNumber?: string;

  @ApiProperty()
  @Prop({ type: String })
  status: EmployeeStatus;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  @IsDefined({
    context: new ValidationError('Email is required'),
  })
  email: string;
}

export type Employee = EmployeeEntity & BaseEntity;
const EmployeeSchema = createSchemaForEntity(EmployeeEntity);
export { EmployeeSchema };
