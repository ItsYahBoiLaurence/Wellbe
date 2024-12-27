import { ApiProperty } from '@nestjs/swagger';
import { PagedList } from '@x/common';
import { Type } from 'class-transformer';
import { Survey, SurveyEntity } from './survey.schema';

export class SurveysList implements PagedList<Survey> {
  @ApiProperty({ type: SurveyEntity, isArray: true })
  @Type(() => SurveyEntity)
  items: Survey[];

  @ApiProperty()
  total: number;
}
