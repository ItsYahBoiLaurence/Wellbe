import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsController } from './questions.controller';
import { QuestionsRepository } from './questions.repository';
import { QuestionsService } from './questions.service';
import { QuestionSchema, QuestionEntity } from './question.schema';

@Module({})
export class QuestionsModule {
  static register(): DynamicModule {
    return {
      module: QuestionsModule,
      imports: [
        MongooseModule.forFeature([
          { name: QuestionEntity.name, schema: QuestionSchema },
        ]),
      ],
      controllers: [QuestionsController],
      providers: [QuestionsService, QuestionsRepository],
      exports: [QuestionsService, QuestionsRepository],
    };
  }
}
