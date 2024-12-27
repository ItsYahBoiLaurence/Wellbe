import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesModule } from '../employees';
import { SurveyEntity, SurveySchema } from './survey.schema';
import { SurveysController } from './surveys.controller';
import { SurveysRepository } from './surveys.repository';
import { SurveysService } from './surveys.service';

@Module({})
export class SurveysModule {
  static register(): DynamicModule {
    return {
      module: SurveysModule,
      imports: [
        MongooseModule.forFeature([
          { name: SurveyEntity.name, schema: SurveySchema },
        ]),
        EmployeesModule.register(),
      ],
      controllers: [SurveysController],
      providers: [SurveysService, SurveysRepository],
      exports: [SurveysService, SurveysRepository],
    };
  }
}
