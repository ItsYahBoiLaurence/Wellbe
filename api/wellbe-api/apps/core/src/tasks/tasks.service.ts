import { Inject, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LoggerService } from '@x/logging';
import { Employee, EmployeesRepository } from '../employees';
import { Notification, NotificationsRepository } from '../notifications';
import { Question, QuestionsRepository } from '../questions';
import { QuestionWithAnswer, Survey, SurveysRepository } from '../surveys';
import { GroupedQuestions } from './tasks.entity';
import { TASKS_CONFIG_OPTIONS } from './constants';
import { TasksConfigOptions } from './tasks-config-options';
import { MailerService } from '@x/mailer';

@Injectable()
export class TasksService {
  constructor(
    private loggerService: LoggerService,
    private employeesRepository: EmployeesRepository,
    private questionsRepository: QuestionsRepository,
    private surveysRepository: SurveysRepository,
    private notificationsRepository: NotificationsRepository,
    private mailerService: MailerService,
    @Inject(TASKS_CONFIG_OPTIONS) private config: TasksConfigOptions
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_5AM)
  async handleSendEmployeeSurveys(): Promise<void> {
    try {
      this.logTaskActivity('START - running handleSendEmployeeSurveys');

      const employees = await this.employeesRepository.find({
        status: 'active',
      });
      if (!employees?.length) {
        this.logTaskActivity(
          'FINISHED - completed handleSendEmployeeSurveys with nothing processed'
        );
        return;
      }

      const questions = await this.questionsRepository.find({}, { limit: 100 });
      const groupedQuestions = questions.reduce((acc, question) => {
        if (!acc[question.domain]) {
          acc[question.domain] = [];
        }
        acc[question.domain].push(question);
        return acc;
      }, {} as GroupedQuestions);

      const tasks = employees.map((employee) =>
        this.handleEmployeeCreateSurvey(employee, groupedQuestions)
      );
      await Promise.all(tasks);

      this.logTaskActivity(
        `FINISHED - completed handleSendEmployeeSurveys for ${employees.length} employees`
      );
    } catch (error) {
      this.loggerService.error(
        `TasksService.handleSendEmployeeSurveys | failed to execute task handleSendEmployeeSurveys`,
        error
      );
    }
  }

  private async handleEmployeeCreateSurvey(
    employee: Employee,
    questions: GroupedQuestions
  ): Promise<void> {
    try {
      const employeeId = employee.id || employee._id?.toString();
      if (!employeeId) {
        this.loggerService.error(
          `TasksService.handleEmployeeCreateSurvey | failed to get employeeId for employee ${employee.id}`
        );
        return;
      }
      const hasAlreadySurveyForToday =
        await this.isEmployeeHasSurveyForToday(employeeId);
      if (hasAlreadySurveyForToday) {
        this.logTaskActivity(
          `TasksService.handleEmployeeCreateSurvey | employee ${employee.id} already has survey for today`
        );
        return;
      }

      const latestSurveys = await this.surveysRepository.find(
        { 'employee.id': employeeId },
        {
          sort: { createdDate: -1 },
          limit: 1,
        }
      );
      const latestSurvey = latestSurveys[0];
      const newQuestions = await this.generateQuestionsForSurvey(
        questions,
        latestSurvey
      );
      const questionsWithAnswers: QuestionWithAnswer[] = newQuestions.map(
        (question) => ({
          question: question.id,
          answer: 0,
        })
      );
      const newSurvey = await this.surveysRepository.create({
        employee: employeeId,
        questions: questionsWithAnswers,
        status: 'pending',
      } as Survey);

      if (!newSurvey) {
        this.loggerService.error(
          `TasksService.handleEmployeeCreateSurvey | failed to create survey for employee ${employee.id}`
        );
        return;
      }

      this.logTaskActivity(
        `TasksService.handleEmployeeCreateSurvey | Successfully created survey for employee ${employee.id}`
      );

      await this.notificationsRepository.create({
        employeeId: employeeId,
        title: 'New Survey',
        description: 'You have a new survey to complete',
        metadata: newSurvey,
      } as unknown as Notification);

      const fullName = `${!employee.firstName ? employee.firstName : ''}${!employee.lastName ? '' : ' ' + employee.lastName}`;

      await this.mailerService.sendMail({
        to: employee.email,
        subject: 'New Survey',
        templateId: this.config.newSurveyTemplateId,
        context: {
          employeeName: fullName || '',
          surveyId: newSurvey.id,
          baseAppUrl: this.config.baseAppUrl,
        },
      });
    } catch (error) {
      this.loggerService.error(
        `TasksService.handleEmployeeCreateSurvey | failed to execute task handleEmployeeCreateSurvey for employee ${employee.id}`,
        error
      );
    }
  }

  private async generateQuestionsForSurvey(
    questions: GroupedQuestions,
    latestSurvey?: Survey
  ): Promise<Question[]> {
    try {
      const questionsForSurvey: Question[] = [];
      if (!latestSurvey) {
        for (const domain in questions) {
          const domainQuestions = questions[domain] as Question[];
          const randomQuestion =
            domainQuestions[Math.floor(Math.random() * domainQuestions.length)];
          questionsForSurvey.push(randomQuestion);
        }
      } else {
        for (const domain in questions) {
          const previousSurveyQuestions = latestSurvey.questions.map(
            (q) => (q.question as Question).id
          );
          const domainQuestions = questions[domain] as Question[];
          const filteredQuestions = domainQuestions.filter(
            (question) => !previousSurveyQuestions.includes(question.id)
          );
          const randomQuestion =
            filteredQuestions[
              Math.floor(Math.random() * filteredQuestions.length)
            ];
          questionsForSurvey.push(randomQuestion);
        }
      }
      return questionsForSurvey;
    } catch (error) {
      this.loggerService.error(
        `TasksService.generateQuestionsForSurvey | failed to generate questions for survey ${latestSurvey.id}`,
        error
      );
    }
  }

  private async isEmployeeHasSurveyForToday(
    employeeId: string
  ): Promise<boolean> {
    try {
      const startDateUtc = moment().startOf('day').utc().toDate();
      const endDateUtc = moment().endOf('day').utc().toDate();
      const surveys = await this.surveysRepository.find({
        'employee.id': employeeId,
        $and: [
          { createdDate: { $gte: startDateUtc } },
          { createdDate: { $lte: endDateUtc } },
        ],
      });
      return !!surveys.length;
    } catch (error) {
      this.loggerService.error(
        `TasksService.isEmployeeHasSurveyForToday | failed to check if employee ${employeeId} has survey for today`,
        error
      );
    }
  }

  private logTaskActivity(message: string) {
    const prefix = '[TASK][TaskService]: ';
    this.loggerService.log(`${prefix}${message}`);
  }
}
