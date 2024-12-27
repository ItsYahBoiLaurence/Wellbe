import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  BaseEntitySchemaOptions,
  createSchemaForEntity,
  objectIdTransform,
} from '@x/common';
import { Expose, Transform } from 'class-transformer';

@Schema({ collection: 'Companies', ...BaseEntitySchemaOptions })
export class CompanyEntity {
  @ApiProperty()
  @Expose()
  @Transform(objectIdTransform)
  id?: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  uniqueName: string;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  about?: string;

  @ApiProperty()
  @Prop()
  logoUrl?: string;
}

export type Company = CompanyEntity & BaseEntity;
const CompanySchema = createSchemaForEntity(CompanyEntity);
export { CompanySchema };
