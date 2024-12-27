import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '@x/common';
import { QuestionEntity, Question } from './question.schema';

@Injectable()
export class QuestionsRepository extends BaseRepository<Question> {
  constructor(@InjectModel(QuestionEntity.name) model: Model<Question>) {
    super(model);
  }
}
