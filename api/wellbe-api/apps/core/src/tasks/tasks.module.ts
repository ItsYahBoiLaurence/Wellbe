import { DynamicModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CommonModule, CommonModulePlatform } from '@x/common';
import { ConfigOptions } from '../config-options';
import { EmployeesModule } from '../employees';
import { NotificationsModule } from '../notifications';
import { QuestionsModule } from '../questions';
import { SurveysModule } from '../surveys';
import { TASKS_CONFIG_OPTIONS } from './constants';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({})
export class TasksModule {
  static register(config: ConfigOptions): DynamicModule {
    return {
      module: TasksModule,
      imports: [
        ScheduleModule.forRoot(),
        CommonModule.register({ platform: CommonModulePlatform.EXPRESS }),
        EmployeesModule.register(),
        QuestionsModule.register(),
        SurveysModule.register(),
        NotificationsModule.register(),
      ],
      providers: [
        {
          provide: TASKS_CONFIG_OPTIONS,
          useValue: {
            newSurveyTemplateId: config.mailer.newSurveyTemplateId,
          },
        },
        TasksService,
      ],
      controllers: [TasksController],
    };
  }
}
