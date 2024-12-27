import { PartialType } from '@nestjs/mapped-types';
import { QuestionEntity } from './question.schema';

export class UpdateQuestionRequest extends PartialType(QuestionEntity) {}
