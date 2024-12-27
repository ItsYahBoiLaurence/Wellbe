import { Injectable } from '@nestjs/common';
import { BaseService } from '@x/common';
import { LoggerService } from '@x/logging';
import { QuestionsRepository } from './questions.repository';
import { Question } from './question.schema';

@Injectable()
export class QuestionsService extends BaseService<
  Question,
  QuestionsRepository
> {
  constructor(repository: QuestionsRepository, loggerService: LoggerService) {
    super(repository, loggerService);
  }
}
