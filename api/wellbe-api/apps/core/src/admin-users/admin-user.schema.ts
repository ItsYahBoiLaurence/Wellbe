import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  BaseEntitySchemaOptions,
  createSchemaForEntity,
  objectIdTransform,
} from '@x/common';
import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';

@Schema({ collection: 'AdminUsers', ...BaseEntitySchemaOptions })
export class AdminUserEntity {
  @ApiProperty()
  @Expose()
  @Transform(objectIdTransform)
  id?: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  @IsDefined()
  cognitoSub: string;
}

export type AdminUser = AdminUserEntity & BaseEntity;
const AdminUserSchema = createSchemaForEntity(AdminUserEntity);
export { AdminUserSchema };
