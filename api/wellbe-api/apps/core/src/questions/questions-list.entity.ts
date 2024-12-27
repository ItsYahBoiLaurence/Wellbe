import { ApiProperty } from '@nestjs/swagger';
import { PagedList } from '@x/common';
import { Type } from 'class-transformer';
import { Question, QuestionEntity } from './question.schema';

export class QuestionsList implements PagedList<Question> {
  @ApiProperty({ type: QuestionEntity, isArray: true })
  @Type(() => QuestionEntity)
  items: Question[];

  @ApiProperty()
  total: number;
}
