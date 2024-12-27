import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  BaseEntitySchemaOptions,
  createSchemaForEntity,
  objectIdTransform,
} from '@x/common';
import { Expose, Transform } from 'class-transformer';
import { SchemaTypes } from 'mongoose';
import { SurveyEntity } from '../surveys';

@Schema({ collection: 'Notifications', ...BaseEntitySchemaOptions })
export class NotificationEntity {
  @ApiProperty()
  @Expose()
  @Transform(objectIdTransform)
  id?: string;

  @ApiProperty()
  @Prop()
  employeeId: string;

  @ApiProperty()
  @Prop()
  title: string;

  @ApiProperty()
  @Prop()
  description: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.Mixed })
  metadata: SurveyEntity | { [key: string]: any };
}

export type Notification = NotificationEntity & BaseEntity;
const NotificationSchema = createSchemaForEntity(NotificationEntity);
export { NotificationSchema };
