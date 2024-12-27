import { PartialType } from '@nestjs/mapped-types';
import { SurveyEntity } from './survey.schema';

export class UpdateSurveyRequest extends PartialType(SurveyEntity) {}
