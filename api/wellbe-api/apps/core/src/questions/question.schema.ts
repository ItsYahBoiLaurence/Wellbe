import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  BaseEntitySchemaOptions,
  createSchemaForEntity,
  objectIdTransform,
} from '@x/common';
import { Expose, Transform, Type } from 'class-transformer';
import { IsDefined } from 'class-validator';

export type QuestionSubdomain =
  | 'autonomy'
  | 'competence'
  | 'environmental-clarity'
  | 'filipino-wellbeing-family'
  | 'filipino-wellbeing-good-economic-condition'
  | 'filipino-wellbeing-housing-and-quality-of-neighborhood'
  | 'filipino-wellbeing-religion-and-spiritual-life'
  | 'life-satisfaction'
  | 'meaning'
  | 'opportunity-for-interpersonal-contact'
  | 'opportunity-for-skill-use'
  | 'physical-security'
  | 'positive-emotions-hope'
  | 'positive-emotions-interest'
  | 'supportive-supervision'
  | 'valued-social-position'
  | 'variety';

export type QuestionDomain =
  | 'character-psychological-wellbeing'
  | 'career-workplace-wellbeing'
  | 'contentment-subjective-wellbeing-life-satisfaction'
  | 'correctedness-subject-wellbeing-family-and-meaning';

export type QuestionLabel = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7';

export class QuestionOption {
  @ApiProperty()
  @Prop()
  title: string;

  @ApiProperty()
  @Prop()
  subtitle: string;

  @ApiProperty()
  @Prop()
  value: number;
}

@Schema({ collection: 'Questions', ...BaseEntitySchemaOptions })
export class QuestionEntity {
  @ApiProperty()
  @Expose()
  @Transform(objectIdTransform)
  id?: string;

  @ApiProperty()
  @Prop()
  @IsDefined()
  question: string;

  @ApiProperty()
  @Prop()
  @IsDefined()
  domain: QuestionDomain;

  @ApiProperty()
  @Prop({ type: String })
  @IsDefined()
  subdomain: QuestionSubdomain;

  @ApiProperty()
  @Prop({ type: String })
  @IsDefined()
  label: QuestionLabel;

  @ApiProperty({ default: [] })
  @Prop({ default: [] })
  @Type(() => QuestionOption)
  options: QuestionOption[];
}

export type Question = QuestionEntity & BaseEntity;
const QuestionSchema = createSchemaForEntity(QuestionEntity);
export { QuestionSchema };
