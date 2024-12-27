import { Injectable } from '@nestjs/common';
import {
  BaseService,
  EntityMetadata,
  NotFoundError,
  UnhandledError,
} from '@x/common';
import { LoggerService } from '@x/logging';
import { Employee, EmployeesRepository } from '../employees';
import { Question } from '../questions';
import { Survey } from './survey.schema';
import { SurveysRepository } from './surveys.repository';
import { UpdateSurveyRequest } from './update-survey-request.entity';

@Injectable()
export class SurveysService extends BaseService<Survey, SurveysRepository> {
  constructor(
    repository: SurveysRepository,
    loggerService: LoggerService,
    private employeesRepository: EmployeesRepository
  ) {
    super(repository, loggerService);
  }

  async getLatestSurveyForEmployee(
    cognitoSub: string
  ): Promise<EntityMetadata<Survey>> {
    try {
      const employee = await this.employeesRepository.findOne({ cognitoSub });
      if (!employee) return new NotFoundError('Employee not found');
      const latestSurveys = await this.repository.find(
        { 'employee.id': employee.id },
        {
          sort: { createdDate: -1 },
          limit: 1,
        }
      );
      if (latestSurveys.length === 0) {
        return new NotFoundError('No survey found for employee');
      }
      return new EntityMetadata(latestSurveys[0]);
    } catch (error) {
      this.loggerService.error(
        `SurveysService.getLatestSurveyForEmployee | Unexpected error`,
        error
      );
      return new UnhandledError(
        'Error while getting latest survey for employee'
      );
    }
  }

  async submitAnswers(
    cognitoSub: string,
    id: string,
    model: UpdateSurveyRequest
  ): Promise<EntityMetadata<Survey>> {
    try {
      const employee = await this.employeesRepository.findOne({ cognitoSub });
      if (!employee) return new NotFoundError('Employee not found');

      const survey = await this.repository.findById(id);
      if (!survey) return new NotFoundError('Survey not found');

      if (employee.id !== (survey.employee as Employee)?.id) {
        return new NotFoundError('Survey not found');
      }

      if (survey.status !== 'pending') {
        return new UnhandledError('Survey is not pending');
      }

      for (const question of survey.questions) {
        const currentQuestion = model.questions.find(
          (q) => (q.question as string) === (question.question as Question).id
        );
        if (!currentQuestion) {
          return new UnhandledError('Question not found');
        }
        if (currentQuestion.answer == null) {
          return new UnhandledError('Answer not provided');
        }
      }

      const result = await this.repository.update(id, {
        $set: { status: 'completed', questions: model.questions },
      });

      if (!result) return new UnhandledError('Error while submitting survey');

      return new EntityMetadata(result);
    } catch (error) {
      this.loggerService.error(
        `SurveysService.submitAnswer | Unexpected error`,
        error
      );
      return new UnhandledError('Error while submitting survey answer');
    }
  }
}
