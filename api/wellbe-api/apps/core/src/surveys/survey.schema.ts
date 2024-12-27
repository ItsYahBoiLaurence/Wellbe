import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  BaseEntitySchemaOptions,
  createSchemaForEntity,
  objectIdTransform,
} from '@x/common';
import { Expose, Transform, Type } from 'class-transformer';
import { IsDefined, IsNumber } from 'class-validator';
import { Types } from 'mongoose';
import { Employee, EmployeeEntity } from '../employees';
import { Question, QuestionEntity } from '../questions';

export type SurveyStatus = 'pending' | 'completed' | 'cancelled' | 'expired';

export class QuestionWithAnswer {
  @ApiProperty({ required: true })
  @Prop({ required: true, type: Types.ObjectId })
  @Type(() => QuestionEntity)
  question: Question | string | Types.ObjectId;

  @ApiProperty()
  @Prop()
  @IsDefined()
  @IsNumber()
  answer: number;

  @ApiProperty()
  @Prop()
  remarks?: string;
}

export class SurveyResult {
  @ApiProperty()
  @Prop()
  score?: number;
}

@Schema({ collection: 'Surveys', ...BaseEntitySchemaOptions })
export class SurveyEntity {
  @ApiProperty()
  @Expose()
  @Transform(objectIdTransform)
  id?: string;

  @ApiProperty({ required: true })
  @Prop({ isRequired: true, type: Types.ObjectId })
  @IsDefined()
  @Type(() => EmployeeEntity)
  employee: Employee | string | Types.ObjectId;

  @ApiProperty({ default: [], isArray: true })
  @Prop({ default: [], type: QuestionWithAnswer })
  @Type(() => QuestionWithAnswer)
  questions: QuestionWithAnswer[];

  @ApiProperty({ default: 'pending' })
  @Prop({ type: String, default: 'pending' })
  @IsDefined()
  status: SurveyStatus;

  @ApiProperty()
  @Prop()
  @Type(() => SurveyResult)
  result?: SurveyResult;
}

export type Survey = SurveyEntity & BaseEntity;
const SurveySchema = createSchemaForEntity(SurveyEntity);
export { SurveySchema };
